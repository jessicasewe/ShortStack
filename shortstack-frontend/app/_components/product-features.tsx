"use client";

import { motion } from "framer-motion";
import { QrCode, Link, Lock } from "lucide-react";

export default function ProductFeatures() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Choose Your Perfect Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your links with our powerful tools designed for every need
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Static QR Code */}
          <motion.div
            variants={item}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <QrCode className="w-8 h-8 text-[#4361EE]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">
              Static QR Code
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4361EE] font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium text-black">Enter your content</p>
                  <p className="text-gray-600 text-sm">
                    Add your URL, text, or any other content you want to encode
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4361EE] font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium text-black">Customize design</p>
                  <p className="text-gray-600 text-sm">
                    Choose colors and patterns to match your brand
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4361EE] font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium text-black">Download & share</p>
                  <p className="text-gray-600 text-sm">
                    Get your QR code in multiple formats
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* URL Shortener */}
          <motion.div
            variants={item}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Link className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">
              URL Shortener
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium text-black">Paste your URL</p>
                  <p className="text-gray-600 text-sm">
                    Input your long URL that needs shortening
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium text-black">Customize link</p>
                  <p className="text-gray-600 text-sm">
                    Create a custom alias for your shortened URL
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium text-black">Track & manage</p>
                  <p className="text-gray-600 text-sm">
                    Monitor clicks and engagement analytics
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Password Protected URL */}
          <motion.div
            variants={item}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black">
              Protected URL
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-semibold">1</span>
                </div>
                <div>
                  <p className="font-medium text-black">Set up protection</p>
                  <p className="text-gray-600 text-sm">
                    Create a password for your URL
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-semibold">2</span>
                </div>
                <div>
                  <p className="font-medium text-black">Share securely</p>
                  <p className="text-gray-600 text-sm">
                    Distribute the protected link to your audience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-semibold">3</span>
                </div>
                <div>
                  <p className="font-medium text-black">Manage access</p>
                  <p className="text-gray-600 text-sm">
                    Control who can view your content
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
