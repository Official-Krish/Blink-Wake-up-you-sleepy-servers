import { Router } from "express";
import { addLinkToPollingQueue } from "../redis";
import { prisma } from "@repo/db/prisma";

export const PollingRouter: Router = Router();

PollingRouter.post("/", async (req, res) => {
    const { url } = req.body;
    const email = req.body.email;

    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });

    if (!url || !user?.id) {
        return res.status(400).json({ message: "Please provide all the required fields" });
    }

    try {
        await prisma.pollingLinks.create({ 
            data: { 
                url, 
                pollingId: user.id, 
                User: {
                    connect: { email: user.email }
                }
            } 
        });
        await addLinkToPollingQueue(url, user.id);
        res.status(200).json({ message: "Polling added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});