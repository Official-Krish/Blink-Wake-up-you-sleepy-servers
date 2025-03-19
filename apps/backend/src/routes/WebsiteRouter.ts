import { prisma } from "@repo/db/prisma";
import { Router } from "express";

export const WebsiteRouter: Router = Router();

WebsiteRouter.get("/getDetails", async (req, res) => {

    const userId = req.query.userId;
    const websiteId = req.query.websiteId;
    
    if (!websiteId) {
        return res.status(400).json({ message: "Please provide all the required fields" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId as string,
            },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        const website = await prisma.pollingLinks.findUnique({
            where: {
                id: websiteId as string,
            },
        });

        if (!website) {
            return res.status(400).json({ message: "Invalid websiteId" });
        }

        const websiteDetails = await prisma.polling_History.findMany({
            where: {
                pollingId: websiteId as string,
            },
            orderBy: {
                CheckedAt: "desc",
            },
        });

        return res.status(200).json({ message: "Details retrieved successfully", websiteDetails });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})