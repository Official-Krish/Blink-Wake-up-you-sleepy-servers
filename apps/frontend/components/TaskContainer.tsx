import axios from "axios";
import { ChevronDown, ChevronUp, CircleArrowUp, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TaskLogs } from "./TaskLogs";
import { Button } from "./ui/button";

interface Ping {
    id: string;
    url: string;
    LastPolledStatus: string;
    PolledAt: string;
}

export default function TaskContainer() {
    const [pings, setPings] = useState<Ping[]>([]);
    const [taskLogsOpen, setTaskLogsOpen] = useState<{ [key: string]: boolean }>({});

    async function fetchPings() {
        const response = await axios.get("/api/ping/getAll");
        const data = await response.data;
        setPings(data);
    }

    useEffect(() => {
        fetchPings();
    }, []);

    async function deletePing(id: string) {
        await axios.post(`/api/ping/delete`, { id, url: pings.find((ping) => ping.id === id)?.url });
        setPings((prev) => prev.filter((ping) => ping.id !== id));
        setTaskLogsOpen((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
        window.location.reload();
    }

    function toggleTaskDetails(id: string) {
        setTaskLogsOpen((prevState) => ({
            ...prevState,
            [id]: !prevState[id], 
        }));
    }

    return (
        <div className="mt-6 flex-grow bg-zinc-900 rounded-xl w-[1000px] min-h-[60px]">
            {pings.length > 0 ? (
                pings.map((ping) => (
                    <div key={ping.id}>
                        <div className={`flex justify-between px-4 ${taskLogsOpen[ping.id] ? "" : "border-b border-white/20"} py-3`}>
                            <p className="text-xl text-white font-semibold">{ping.url}</p>
                            <div className="flex space-x-3">
                                <div className="flex items-center">
                                    <div className={`h-3 w-3 rounded-full mr-3 ${ping.LastPolledStatus === "UP" ? "bg-green-500" : "bg-red-500"}`}></div>
                                </div>
                                <Button variant="default" onClick={() => toggleTaskDetails(ping.id)}>
                                    {taskLogsOpen[ping.id] ? <ChevronUp /> : <ChevronDown />}
                                </Button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={() => deletePing(ping.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        {taskLogsOpen[ping.id] && (
                            <TaskLogs Server={ping.LastPolledStatus} Last_Polled={ping.PolledAt} />
                        )}
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
