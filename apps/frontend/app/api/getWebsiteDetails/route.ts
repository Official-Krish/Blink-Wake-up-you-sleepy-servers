import { authConfig } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const session = await getServerSession(authConfig);
    if (!session) {
        NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const websiteId = searchParams.get("websiteId");
    console.log("websiteId", websiteId);

    if (!websiteId) {
        return NextResponse.json({ message: "Please provide all the required fields" }, { status: 400 });
    }

    try { 
        console.log("sending request");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/website/getDetails`, {
            params: {
                websiteId: websiteId,
                userId: session?.user.uid,
            }
        });

        if (response.status === 200) {
            return NextResponse.json(response.data.websiteDetails, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }

}