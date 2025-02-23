require("dotenv").config();
import { createHash } from "crypto";
import IORedis  from "ioredis";

const redis = new IORedis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
})

const POLLING_INTERVAL = 1000 * 10;

export const addLinkToPollingQueue = async (url: string, userId: string) => {
    console.log("Adding task to polling queue", url);
    const taskId = await hashUrl(url);
    const existingTask = await redis.zscore("pollingQueue", taskId);

    if (existingTask) {
        console.log("Task already exists in the queue", url);
        return;
    }

    await redis.zadd("pollingQueue", Date.now(), JSON.stringify({ url, taskId, POLLING_INTERVAL, userId }));
    console.log("Added task to polling queue", url);
}

export const hashUrl = async (url: string) => {
    return createHash("sha256").update(url).digest("hex");
}

export const removeLinkFromPollingQueue = async (id: string, url: string) => {
    try {
        const pollingQueueEntries = await redis.zrange('pollingQueue', 0, -1);
        for (const entry of pollingQueueEntries) {
            const parsedEntry = JSON.parse(entry);
            if (parsedEntry.url === url && parsedEntry.userId === id) {
                await redis.zrem('pollingQueue', entry);
                break; 
            }
        }
        await redis.lrem('pollingResults', 0, url);
    } catch (error) {
        console.error('Error removing link from polling queue:', error);
        throw error;
    }
};