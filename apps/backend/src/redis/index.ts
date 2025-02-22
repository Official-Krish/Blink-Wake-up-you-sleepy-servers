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

export const removeLinkFromPollingQueue = async (id: string) => {
    return new Promise((resolve, reject) => {
        redis.lrem('pollingQueue', 1, id, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}