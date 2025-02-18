"use client"
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Appbar() {
    const session = useSession();
    return (
        <div className="flex items-center justify-between w-full h-16 bg-gray-800 px-4 py-2">
            <div className="flex items-center">
                <span className="text-white text-2xl font-bold ml-4">
                    Wake Up Sleepy Servers
                </span>
            </div>
            <div className="flex items-center">
                {session.data?.user && 
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-md" onClick={() => signOut()}>
                        Sign Out
                    </button>
                }
                
                {!session.data?.user && 
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-md" onClick={() => signIn()}>
                        Sign In
                    </button>
                }
            </div>
        </div>
    );
}