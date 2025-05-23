"use client";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-gray-400 py-6 text-center flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="text-sm mb-4">© 2025 Blink All rights reserved.</div>
        <div className="flex justify-center gap-8">
            <Link
                href="https://x.com/KrishAnand0103"
                className="hover:text-gray-200"
            >
                Contact
            </Link>
            <Link
                href="https://x.com/KrishAnand0103"
                target="_blank"
                className="hover:text-gray-200"
            >
                Twitter
            </Link>
            <Link
                href="https://github.com/Official-Krish"
                target="_blank"
                className="hover:text-gray-200"
            >
                GitHub
            </Link>
        </div>
    </footer>
  );
};