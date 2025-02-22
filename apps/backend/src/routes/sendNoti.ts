import { prisma } from "@repo/db/prisma";
import { Router } from "express";
import { sendEmail } from "../utils/emailService";
import { sendDiscordNotification } from "../utils/DcServices";

export const NotificationRouter: Router = Router();

NotificationRouter.post("/sendNoti", async (req, res) => {
    try{
        const { url, userId, TimeStamp } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
        });

        sendEmail(url, user?.name || user?.email.slice(0, user?.email.indexOf("@"))|| "Unknown", url, TimeStamp);

        const getDcUrl = await prisma.pollingLinks.findUnique({
            where: {
                id: url,
                url: url,
            },
            include: {
                User: true
            }
        });

        if (getDcUrl?.notify){
            sendDiscordNotification(getDcUrl?.discordUrl || "", user?.name || user?.email.slice(0, user?.email.indexOf("@"))|| "Unknown", url, TimeStamp);
        }
        res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});