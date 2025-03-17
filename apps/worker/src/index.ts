require("dotenv").config();
import axios, { AxiosError } from "axios";
import IORedis  from "ioredis";
import { syncResultsToDatabase } from "./storeInDB";

export const redis = new IORedis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
})

const fetchAndRescheduleTask = async (): Promise<{ id: string; url: string; interval: number; userId: string} | null> => {
    const now = Date.now();
    const luaScript = `
        local task = redis.call('ZRANGEBYSCORE', KEYS[1], 0, ARGV[1], 'LIMIT', 0, 1)[1]
        if task then
        redis.call('ZREM', KEYS[1], task)
        redis.call('ZADD', KEYS[1], ARGV[2], task)
        return task
        end
        return nil
    `;

    const task = await redis.eval(
        luaScript,
        1, 
        'pollingQueue', // Key name
        now, // ARGV[1]: Current timestamp
        now + 1000 * 60 * 5 // ARGV[2]: Next polling time (e.g., 5 minute later)
    );

    return task ? JSON.parse(task as string) : null;

}


const pollLink = async (url: string, userId: string): Promise<void> => {
    try {
        const response = await axios.get(url);
        console.log("Polling successful", url);

        let PolledStatus: string;

        if (response.status !== 200) {
            PolledStatus = "DOWN";
            await axios.post(`${process.env.BACKEND_URL}/SendNoti`, {
                ueerId: userId,
                url: url,
                TimeStamp: new Date().toString(),
            })
        } else {
            PolledStatus = "UP";
        }
        await storePollingResultInRedis(url, PolledStatus, userId);
    } catch (error) {
        await axios.post(`${process.env.BACKEND_URL}/SendNoti`, {
            ueerId: userId,
            url: url,
            TimeStamp: new Date().toString(),
        })
        console.error(`Polling failed for ${url}:`, (error as AxiosError).message);
    }
}

const storePollingResultInRedis = async (url: string, PolledStatus: string, userId: string): Promise<void> => {
    console.log("Storing polling result in Redis", url);
    await redis.rpush('pollingResults', JSON.stringify({ url, PolledStatus, timestamp: Date.now(), userId }));
  };

const startWorker = async (): Promise<void> => {
    while (true) {
        const task = await fetchAndRescheduleTask();

        if(task){
            const { url, userId } = task;
            if(!userId){
                console.log("User not found, skipping...");
            }
            await pollLink(url, userId);
        } else{
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

startWorker();
setInterval(syncResultsToDatabase, 1000 * 60 * 10); // Sync results to database every 10 minutes