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
        return NextResponse.json(pings);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}