import axios from "axios";
import { CircleArrowUp, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Ping {
    id: string;
    url: string;
    LastPolledStatus: string;
    PolledAt: Date;
}

export default function TaskContainer() {
    const [pings, setPings] = useState<Ping[]>([]);

    async function fetchPings() {
        const response = await axios.get("/api/ping/getAll");
        const data = await response.data;
        setPings(data);
    }
    useEffect(() => {
        fetchPings();
    }, []);

    async function deletePing(id: string) {
        await axios.post(`/api/ping/delete`, {
            id,
        });
        setPings(pings.filter((ping) => ping.id !== id));
    }

    return (
        <div className="mt-6 flex-grow bg-zinc-900 rounded-xl w-[1000px] min-h-[60px]">
            {pings.length > 0 ? (
                pings.map((ping) => (
                    <div key={ping.id} className="flex justify-between px-4 border-b border-white/20 py-3">
                        <p className="text-xl text-white font-semibold">{ping.url}</p>
                        <div className="flex space-x-3">
                            <p className={`text-lg ${ping.LastPolledStatus === "UP" ? "text-green-500" : "text-red-500"} font-semibold`}>
                                {ping.LastPolledStatus === "UP" ? "Server is up" : "Server is down"}
                            </p>
                            <p className="text-lg text-white font-semibold">{
                                new Date(ping.PolledAt).toLocaleString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })
                            }</p>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={() => deletePing(ping.id)}>
                                {<Trash2 className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="space-y-3 flex flex-col items-center justify-center py-8">
                    <CircleArrowUp className="text-white w-12 h-12" />
                    <h1 className="text-lg font-semibld text-white">No Tasks Added Yet</h1>
                    <p className="text-sm text-slate-400 font-semibold">Use the button above to add your first task and start being productive!</p>
                </div>
            )}
        </div>
    );
}