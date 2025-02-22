import { authConfig } from "@/lib/auth";
import { prisma } from "@repo/db/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return NextResponse.json({ error: "You are not authenticated" }, { status: 401 });
    }
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Please provide a valid id" }, { status: 400 });
        }

        await prisma.pollingLinks.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({ msg: "Ping deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}