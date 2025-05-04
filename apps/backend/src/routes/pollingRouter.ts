import { Router } from "express";
import { addLinkToPollingQueue, removeLinkFromPollingQueue } from "../redis";
import { prisma } from "@repo/db/prisma";

export const PollingRouter: Router = Router();

PollingRouter.post("/create", async (req, res) => {
    const { url, userId, notify, discordUrl } = req.body;

    if (!url || !userId) {
        res.status(400).json({ message: "Please provide all the required fields" });
        return;
    }
    let discordURL
    if(!notify){
        discordURL = null;
    } else {
        discordURL = discordUrl;
    }

    try {
        const polling = await prisma.pollingLinks.create({ 
            data: { 
                url, 
                notify: notify,
                discordUrl: discordURL,
                User: {
                    connect: { id: userId }
                }
            } 
        });
        
        const start = Date.now();
        const response = await fetch(url);
        const end = Date.now();
        
        await prisma.polling_History.create({
            data: {
                url: url,
                pollingId: polling.id,
                status: response.status === 200 ? "UP" : "DOWN",
                CheckedAt: new Date(),
                responseTime: end - start,
            },
        });

        await addLinkToPollingQueue(url, userId);
        res.status(200).json({ message: "Polling added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

PollingRouter.post("/delete", async (req, res) => {
    const { id, url } = req.body;
    if (!id) {
        res.status(400).json({ message: "Please provide a valid id" });
        return;
    }

    try {
        const LINK = await prisma.pollingLinks.delete({
            where: {
                id: id,
                url: url,
            },
        });        
        removeLinkFromPollingQueue(LINK.userId, url);
        res.status(200).json({ message: "Polling deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
