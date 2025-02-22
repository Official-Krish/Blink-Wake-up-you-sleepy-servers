import { authConfig } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return NextResponse.json({ error: "You are not authenticated" }, { status: 401 });
    }

    try{
        const { url, notify, discordUrl } = await req.json();
        console.log(url, notify, discordUrl);

        if (!url || !notify) {
            return NextResponse.json({ error: "Please enter a valid URL" }, { status: 400 });
        }

        const reponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ping/create`, {
            url,
            notify,
            discordUrl,
            userId: session.user.uid,
        })
        if (reponse.status === 200) {
            return NextResponse.json({ msg: "Ping added Successfull" }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
} 