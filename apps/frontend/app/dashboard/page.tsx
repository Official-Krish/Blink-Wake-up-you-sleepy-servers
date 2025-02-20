"use client"
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
    const session = useSession();
    return (
        <div className="flex flex-col items-center justify-center bg-black h-screen">
            <button onClick={() => {
                    signOut();
                    if(!session?.data?.user) { 
                        window.location.href = "/"
                    }
                }} className="bg-white text-black hover:bg-gray-200 transition-colors group">
                Logout
            </button>
        </div>
    )
}