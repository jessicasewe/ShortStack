"use client";

import { motion } from "framer-motion";
import { Save, Clock, BarChart3, Edit3 } from "lucide-react";
import { Button } from "@/components/button";

export default function PremiumFeatures() {
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2f261a] via-[#2e210b] to-[#4d2d0f]" />

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              Try our QR code generator for 7 days free.
            </motion.h2>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <motion.div variants={item} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Save className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Save & Manage Links
                  </h3>
                  <p className="text-gray-300">
                    Keep all your QR codes organized in one place
                  </p>
                </div>
              </motion.div>

              <motion.div variants={item} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Set Expiration & Passwords
                  </h3>
                  <p className="text-gray-300">
                    Control access and lifetime of your QR codes
                  </p>
                </div>
              </motion.div>

              <motion.div variants={item} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    View Analytics
                  </h3>
                  <p className="text-gray-300">
                    Track scans and user engagement data
                  </p>
                </div>
              </motion.div>

              <motion.div variants={item} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Delete & Edit Links
                  </h3>
                  <p className="text-gray-300">
                    Modify or remove QR codes anytime
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <Button
                size="lg"
                className="bg-white text-[#1a0b2e] hover:bg-white/90"
              >
                Sign Up now
              </Button>
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="../../dashboard.png"
                alt="QRFY Dashboard Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e1c0b] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
