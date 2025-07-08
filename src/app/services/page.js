"use client";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

// Enhanced animation variants
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

const services = [
  {
    title: "Frontend/Backend Web Development",
    description:
      "Build dynamic, responsive, and scalable web applications using modern frameworks.",
    icon: "💻",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Design intelligent systems and AI models for your business needs.",
    icon: "🧠",
  },
  {
    title: "Mobile App Development",
    description:
      "Create high-performance mobile apps for iOS and Android platforms.",
    icon: "📱",
  },
  {
    title: "UI/UX Design",
    description:
      "Intuitive and beautiful interfaces crafted for engagement and usability.",
    icon: "🎨",
  },
  {
    title: "DevSecOps Engineering",
    description:
      "Security-first DevOps—automate CI/CD pipelines with integrated security.",
    icon: "🔐",
  },
  {
    title: "Data Engineering",
    description:
      "Build robust data pipelines and infrastructure for insights and analytics.",
    icon: "📊",
  },
];

const ServicesPage = () => (
  <>
    <Head>
      <title>Our Services | ASC‑cm</title>
      <meta
        name="description"
        content="Training & services in Web Dev, AI/ML, Mobile, UI/UX, DevSecOps, Data Engineering."
      />
    </Head>

    {/* Hero */}
    <section className="min-h-100 bg-gradient-to-r from-indigo-900 to-green-800 text-white py-24 text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={flyInFromBottom}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Your Path to{" "}
          <motion.span
            className="text-yellow-600 inline-block"
            initial={{ opacity: 0, scale: 1.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              delay: 0.3,
            }}
            viewport={{ once: true }}
          >
            Digital Mastery
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.4,
          }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-200"
        >
          Services & training in Web, AI/ML, Mobile, UI/UX, DevSecOps, Data
          Engineering.
        </motion.p>
      </div>
    </section>

    {/* Service Cards */}
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
        {services.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: idx * 0.15,
            }}
            viewport={{ once: true }}
            className="bg-gray-50 hover:bg-blue-50 rounded-xl border shadow p-6 transition hover:shadow-lg"
          >
            <motion.div
              className="text-4xl mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                type: "spring",
                delay: idx * 0.15 + 0.2,
              }}
              viewport={{ once: true }}
            >
              {s.icon}
            </motion.div>
            <motion.h3
              className="text-xl font-semibold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 + 0.3 }}
              viewport={{ once: true }}
            >
              {s.title}
            </motion.h3>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 + 0.4 }}
              viewport={{ once: true }}
            >
              {s.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-gray-400 text-black py-20 text-center"
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to{" "}
          <motion.span
            className="text-yellow-600"
            initial={{ opacity: 0, scale: 1.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              delay: 0.4,
            }}
            viewport={{ once: true }}
          >
            Hire a Developer
          </motion.span>{" "}
          or Start Training?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 0.6,
          }}
          viewport={{ once: true }}
          className="text-black mb-8 text-lg"
        >
          Whether you need expert help or want to upskill, we have you covered.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 10,
            delay: 0.8,
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="https://wa.me/2347034418309"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Hire a Developer
          </Link>
        </motion.div>
      </div>
    </motion.section>
  </>
);

export default ServicesPage;
