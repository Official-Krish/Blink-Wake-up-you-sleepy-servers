import { redis } from "./index";
import { prisma } from "@repo/db/prisma";

const storePollingResultInDatabase = async (url: string, PolledStatus: string, timestamp: number, userId: string, latency: string): Promise<void> => {
    const linkExists = await checkIfLinkExists(url, userId);
    if (!linkExists) {
        console.error(`Polling link ${url} not found in Redis for user ${userId}`);
        return;
    }
    console.log(`Storing polling result for ${url} in database...`);
    try {
        await prisma.$transaction(async (prisma) => {
            const findPollingLink = await prisma.pollingLinks.findFirst({
                where: {
                    url: url,
                    userId: userId,
                },
            });

            if (!findPollingLink) {
                console.error(`Polling link ${url} not found for user ${userId}`);
                throw new Error(`Polling link ${url} not found for user ${userId}`);
            }  

            await prisma.polling_History.create({
                data: {
                    url,
                    status: PolledStatus === 'UP' ? 'UP' : 'DOWN',
                    responseTime: parseFloat(latency),
                    CheckedAt: new Date(timestamp),
                    pollingId: findPollingLink.id,
                },
            });
        });
      console.log(`Stored polling result for ${url} in database.`);
    } catch (error) {
      console.error(`Failed to store polling result for ${url}:`, error);
      // Re-add the result to Redis for retry
      await redis.rpush('pollingResults', JSON.stringify({ url, PolledStatus, timestamp, userId }));
    }
};

export const syncResultsToDatabase = async (): Promise<void> => {
    while (true) {
      const result = await redis.lpop('pollingResults');
      if (!result) break;
  
      const { url, PolledStatus, timestamp, userId, latency } = JSON.parse(result);
      await storePollingResultInDatabase(url, PolledStatus, timestamp, userId, latency);
    }
};

const checkIfLinkExists = async (url: string, userId: string) => {
    const links = await redis.zrange('pollingQueue', 0, -1);
    return links.some(link => {
        const parsedLink = JSON.parse(link);
        return parsedLink.url === url && parsedLink.userId === userId;
    });
};