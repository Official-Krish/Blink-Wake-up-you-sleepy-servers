import { prisma } from "@repo/db/prisma";
import { Router } from "express";

export const WebsiteRouter: Router = Router();

WebsiteRouter.get("/getDetails", async (req, res) => {

    const userId = req.query.userId;
    const websiteId = req.query.websiteId;
    
    if (!websiteId) {
        res.status(400).json({ message: "Please provide all the required fields" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId as string,
            },
        });

        if (!user) {
            res.status(400).json({ message: "Invalid userId" });
            return;
        }

        const website = await prisma.pollingLinks.findUnique({
            where: {
                id: websiteId as string,
            },
        });

        if (!website) {
            res.status(400).json({ message: "Invalid websiteId" });
            return;
        }

        const websiteDetails = await prisma.polling_History.findMany({
            where: {
                pollingId: websiteId as string,
            },
            orderBy: {
                CheckedAt: "desc",
            },
        });

        res.status(200).json({ message: "Details retrieved successfully", websiteDetails });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})