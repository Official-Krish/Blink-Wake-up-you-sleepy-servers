"use client";

import { motion } from "framer-motion";
import { LogOut, Plus } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import React from "react";
import { SectionWrapper } from "@/components/Section-wrapper";
import AddTaskForm from "@/components/Add-tasks";
import SheetWrapper from "@/components/SheetWrapper";
import TaskContainer from "@/components/TaskContainer";

export default function Dashboard() {
  return (
    <SectionWrapper>
      <div className="flex-grow flex flex-col min-h-screen bg-[#0E0C0A] text-white w-full">
        <div className="container mx-auto flex flex-col min-h-screen w-full">
          <section className="w-full py-2 md:py-24 lg:py-32 xl:py-38 relative select-none flex flex-col gap-2 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <DashboardHeader />
              <TaskContainer />
            </motion.div>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}

function DashboardHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const handleLogout = () => {
    setIsLoggingOut(true);
    signOut();
    setIsLoggingOut(false);
  };

  if (isLoggingOut) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-[85%] md:px-4 py-6 md:py-8 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex  sm:flex-row sm:items-center justify-between gap-4">
            <motion.h1
              className="text-3xl font-bold tracking-tight md:text-4xl text-center sm:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Logging Out...
            </motion.h1>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-[85%] md:px-4 py-6 md:py-8 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex  sm:flex-row sm:items-center justify-between gap-4">
          <motion.h1
            className="text-3xl font-bold tracking-tight md:text-4xl text-center sm:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Dashboard
          </motion.h1>
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden flex justify-center items-center"
              onClick={() => setIsOpen(true)}
            >
              <Plus className=" h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-red-500"
              onClick={() => handleLogout()}
            >
              <LogOut className=" h-4 w-4" />
            </Button>

            <motion.div
              className="hidden md:flex md:gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="destructive"
                onClick={() => signOut()}
                className="flex items-center gap-2 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Log Out</span>
              </Button>
              <Button
                variant="default"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 rounded-lg"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden lg:inline">Add task</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <SheetWrapper
        title="Add Task"
        description="Add a new task to monitor"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <AddTaskForm onClose={() => setIsOpen(false)} />
      </SheetWrapper>
    </motion.div>
  );
}