"use client";
import { motion } from "framer-motion";
import SectionTitle from "./common/SectionTitle";
import Card from "./common/Card";

// Animation variants matching your pattern
const flyInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8,
    },
  },
};

const flyInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8,
    },
  },
};

const flyInFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.8,
    },
  },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
      duration: 0.6,
    },
  },
};

const Services = () => {
  const services = [
    {
      title: "Custom Web Development",
      description:
        "Tailored solutions built with React, Next.js, and modern frameworks.",
      icon: "💻",
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Online stores with secure payments and inventory management.",
      icon: "🛒",
    },
    {
      title: "Business Websites",
      description: "Professional sites that showcase your brand and services.",
      icon: "🏢",
    },
    {
      title: "Web Applications",
      description: "Custom SaaS solutions for your business needs.",
      icon: "📱",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful interfaces that enhance user experience.",
      icon: "🎨",
    },
    {
      title: "SEO Optimization",
      description: "Improve your search rankings and visibility.",
      icon: "🔍",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={flyInFromBottom}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionTitle
            title="Our Services"
            subtitle="What We Offer"
            description="Comprehensive solutions to grow your business online"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-all h-full">
                <motion.div
                  className="text-4xl mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    delay: index * 0.15 + 0.2,
                  }}
                  viewport={{ once: true }}
                >
                  {service.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-bold mb-2 text-black"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
