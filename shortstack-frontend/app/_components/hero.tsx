"use client";

import { Button } from "@/components/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjEpIi8+PC9zdmc+')] overflow-hidden">
      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, x: -100, y: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-10 top-20 transform -rotate-12"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-12, -8, -12],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-white rounded-lg shadow-xl p-4 w-64"
        >
          <div className="flex items-start gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-800">Quick Notes</h3>
              <p className="text-xs text-gray-500">Track important details</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute right-10 bottom-20 transform rotate-12"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [12, 8, 12],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="bg-white rounded-lg shadow-xl p-4 w-64"
        >
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-800">Share Links</h3>
              <p className="text-xs text-gray-500">Easy collaboration</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-gray-900">Shorten, Share, Simplify</span>
          <br />
          <span className="text-orange-200">all in one place</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Transform your long URLs into powerful, trackable links that drive
          better engagement and results.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/auth/pricing">
            <Button
              size="lg"
              className="bg-[#a24b33] hover:bg-[#a24b33]/90 text-white px-8 py-6 text-lg rounded-full"
            >
              Get started
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Integration Icons */}
      <motion.div
        initial={{ opacity: 0, x: 100, y: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="absolute right-4 top-20"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="bg-white rounded-xl shadow-xl p-4"
        >
          <div className="text-sm font-medium mb-2 text-gray-800">
            Popular Integrations
          </div>
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22,3H2A2,2 0 0,0 0,5V19A2,2 0 0,0 2,21H22A2,2 0 0,0 24,19V5A2,2 0 0,0 22,3M22,19H2V5H22V19M14,17V15H12V17H14M17,13.5V12H15V13.5H17M13,10V8H11V10H13Z" />
              </svg>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-green-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
              </svg>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-yellow-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
