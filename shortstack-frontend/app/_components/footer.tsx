"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const scrollingItems = [
    "Shorten URLs with a click",
    "Generate QR codes for any link",
    "Create expiring links for added security",
    "Protect your links with passwords",
    "Instantly share shortened links on social media",
    "Preview links before clicking to avoid phishing",
    "Developer-friendly API for shortening URLs",
    "Save your URLs and QR codes on your dashboard",
  ];

  return (
    <footer className="bg-gray-50">
      {/* Scrolling Text Section */}
      <div className="relative w-full overflow-hidden py-12 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          {/* First set of items */}
          {scrollingItems.map((item, index) => (
            <div
              key={index}
              className="mx-4 rounded-full bg-[#FFF5EB] px-6 py-2 text-sm"
            >
              {item}
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {scrollingItems.map((item, index) => (
            <div
              key={`duplicate-${index}`}
              className="mx-4 rounded-full bg-[#FFF5EB] px-6 py-2 text-sm"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
