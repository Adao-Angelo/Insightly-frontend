"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[8rem] md:text-[12rem] font-extrabold text-accent-orange drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl md:text-3xl font-semibold text-content-primary mb-3"
      >
        Page not found
      </motion.h2>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-content-secondary mb-8 max-w-md"
      >
        The requested resource could not be found. It may have been moved or
        removed.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-accent-orange text-white font-medium hover:bg-accent-orange/80 transition-all duration-200 shadow-md inline-flex items-center"
        >
          Back to homepage
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{
          delay: 1,
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <div className="w-[300px] h-[300px] rounded-full bg-accent-orange blur-3xl opacity-20" />
      </motion.div>
    </div>
  );
}
