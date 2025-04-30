"use client";
import { motion } from "framer-motion";

const TitleSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-8 text-center text-white">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
      >
        Welcome to <span className="text-pink-500">DK-GADGET</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto"
      >
        Discover top-quality electronics, unbeatable prices, and fast delivery — all in one trusted gadget shop.
      </motion.p>
    </section>
  );
};

export default TitleSection;
