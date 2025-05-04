import { authConfig } from "@/lib/auth";
import { prisma } from "@repo/db/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return NextResponse.json({ error: "You are not authenticated" }, { status: 401 });
    }
    try {
        const pings = await prisma.pollingLinks.findMany({
            where: {
                userId: session.user.uid,
            },
        });
        const pollHistory = await prisma.polling_History.findMany({
            where: {
                pollingId: {
                    in: pings.map((ping) => ping.id),
                },
            },
            orderBy: {
                CheckedAt: "desc",
            },
        });
        const data = pings.map((ping) => ({
            ...ping,
            status: pollHistory.find((history) => history.pollingId === ping.id)?.status,
            checkedAt: pollHistory.find((history) => history.pollingId === ping.id)?.CheckedAt.toString(),
        }));
        console.log(data);
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}