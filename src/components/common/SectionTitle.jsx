// src/components/common/SectionTitle.js
"use client";

import { motion } from "framer-motion";

const SectionTitle = ({ title, subtitle, description }) => {
  return (
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        className="text-blue-600 text-lg font-medium mb-2"
      >
        {subtitle}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="text-gray-600 max-w-xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default SectionTitle;
