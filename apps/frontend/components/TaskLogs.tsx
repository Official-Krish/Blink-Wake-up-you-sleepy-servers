import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export const TaskLogs = ({
    Server,
    Last_Polled,
  }: {
    Server: string,
    Last_Polled: string,
  }) => {
    return (
      <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 border-b border-white/20"
          >
            <div className="flex flex-col items-start justify-start px-5 ">
              <h4 className="font-semibold mb-2">Logs</h4>
              {Last_Polled === "Polling will start Soon" ? (
                <p className="text-sm text-foreground/40">No logs available</p>
              ) : (
                <ul className="space-y-2 bg-zinc-900 w-full flex flex-col justify-center items-start gap-0 py-3 rounded-xl">
                    <li
                      className={cn(
                        "text-sm text-foreground/40 text-left",
                        Server === "UP" ? "text-green-500" : "text-red-300"
                      )}
                    >
                      <span className="font-medium">
                        [ {(new Date(Last_Polled)).toLocaleString("en-US", {
                          day: "numeric",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })} ]
                      </span>{" "}
                      - {Server === "UP" ? "Server is up" : "Server is down"} - {Server === "UP" ? "200" : "500"}
                    </li>
                </ul>
              )}
            </div>
          </motion.div>
      </AnimatePresence>
    );
  };