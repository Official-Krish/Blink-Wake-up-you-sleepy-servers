import { Router } from "express";
import { addLinkToPollingQueue, removeLinkFromPollingQueue } from "../redis";
import { prisma } from "@repo/db/prisma";

export const PollingRouter: Router = Router();

PollingRouter.post("/create", async (req, res) => {
    const { url, userId, notify, discordUrl } = req.body;

    if (!url || !userId) {
        return res.status(400).json({ message: "Please provide all the required fields" });
    }

    try {
        await prisma.pollingLinks.create({ 
            data: { 
                url, 
                pollingId: userId, 
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
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Please provide a valid id" });
    }

    try {
        await removeLinkFromPollingQueue(id);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
