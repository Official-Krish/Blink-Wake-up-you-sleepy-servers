import { Router } from "express";
import { addLinkToPollingQueue, removeLinkFromPollingQueue } from "../redis";
import { prisma } from "@repo/db/prisma";

export const PollingRouter: Router = Router();

PollingRouter.post("/create", async (req, res) => {
    const { url, userId, notify, discordUrl } = req.body;

    if (!url || !userId) {
        return res.status(400).json({ message: "Please provide all the required fields" });
    }
    let discordURL
    if(!notify){
        discordURL = null;
    } else {
        discordURL = discordUrl;
    }

    try {
        await prisma.pollingLinks.create({ 
            data: { 
                url, 
                pollingId: userId, 
                notify: notify,
                discordUrl: discordURL,
                User: {
                    connect: { id: userId }
                }
            } 
        });
        await addLinkToPollingQueue(url, userId);
        res.status(200).json({ message: "Polling added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

PollingRouter.post("/delete", async (req, res) => {
    const { id, url } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Please provide a valid id" });
    }

    try {
        const LINK = await prisma.pollingLinks.delete({
            where: {
                id: id,
                url: url,
            },
        });        
        removeLinkFromPollingQueue(LINK.userId, url);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
