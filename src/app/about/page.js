"use client";
import { useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const AboutPage = () => {
  const sectionRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // More dramatic animation variants
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

  return (
    <>
      <Head>
        <title>About Us | ASC-cm</title>
        <meta
          name="description"
          content="Learn about TechSphere – your partner in tech training and digital services."
        />
      </Head>

      {/* Hero Section */}
      <section className="min-h-100 bg-gradient-to-r from-indigo-900 to-green-800 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            variants={flyInFromBottom}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Empowering{" "}
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
              Digital Growth
            </motion.span>
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={flyInFromBottom}
            transition={{ delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Providing world-class tech training and solutions to accelerate
            business transformation.
          </motion.p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={addToRefs}
            initial="hidden"
            whileInView="visible"
            variants={flyInFromLeft}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              viewport={{ once: true }}
            >
              Our{" "}
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
                Mission
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-gray-700 text-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              At ASC-cm, we believe in building a bridge between skill and
              innovation. We're dedicated to equipping individuals and
              organizations with the tools and training needed to thrive in the
              digital era.
            </motion.p>
          </motion.div>
          <motion.div
            className="relative h-80 w-full"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.3,
            }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/11.jpg"
              alt="Tech Training"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={flyInFromRight}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-gray-900 mb-12"
          >
            What We{" "}
            <motion.span
              className="text-yellow-600"
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
              Offer
            </motion.span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Development",
                desc: "Custom websites & web applications with modern frameworks.",
                icon: "💻",
              },
              {
                title: "UI/UX Design",
                desc: "Beautiful interfaces that ensure intuitive user experiences.",
                icon: "🎨",
              },
              {
                title: "Tech Training",
                desc: "Intensive programs in Web Dev, Python, Data Science & more.",
                icon: "📚",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: i * 0.2,
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    delay: i * 0.2 + 0.3,
                  }}
                  viewport={{ once: true }}
                >
                  {item.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-800 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {item.desc}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-400 text-black text-center">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Join the{" "}
            <motion.span
              className="text-yellow-600"
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
              Tech Revolution
            </motion.span>
            ?
          </motion.h2>
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
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Whether you're looking to upgrade your skills or need digital
            services, ASC-cm is your trusted partner.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 10,
              delay: 0.6,
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact">
              <button className="bg-yellow-600 text-black font-bold px-8 py-3 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Today
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
