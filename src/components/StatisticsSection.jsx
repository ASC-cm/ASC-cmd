"use client";
import Link from "next/link";
import {
  FaWhatsapp,
  FaCode,
  FaServer,
  FaDatabase,
  FaMobileAlt,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { SiJavascript, SiTypescript, SiReact, SiPython } from "react-icons/si";
import { motion } from "framer-motion";

const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const currentRef = counterRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 2000;
            const startTime = performance.now();

            const animateCount = (currentTime) => {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              const currentCount = Math.floor(progress * target);

              setCount(currentCount);

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(animateCount);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [target, hasAnimated]);

  return (
    <span ref={counterRef} aria-live="polite">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const techStats = [
  {
    icon: <FaCode className="text-blue-600 text-5xl mb-2" />,
    label: "Projects Completed",
    value: 15,
    description: "Web applications and features delivered",
  },
  {
    icon: <SiJavascript className="text-yellow-500 text-5xl mb-2" />,
    label: "JS/TS Experience",
    value: 2,
    suffix: " yrs",
    description: "Modern JavaScript and TypeScript development",
  },
  {
    icon: <SiReact className="text-blue-400 text-5xl mb-2" />,
    label: "React Components",
    value: 120,
    description: "Reusable components built and maintained",
  },
  {
    icon: <FaServer className="text-purple-600 text-5xl mb-2" />,
    label: "APIs Integrated",
    value: 8,
    description: "Third-party and internal API integrations",
  },
  {
    icon: <FaDatabase className="text-green-600 text-5xl mb-2" />,
    label: "Database Experience",
    value: 3,
    description: "SQL and NoSQL database systems worked with",
  },
  {
    icon: <SiPython className="text-green-500 text-5xl mb-2" />,
    label: "Python Projects",
    value: 5,
    description: "Backend services and tools developed",
  },
  {
    icon: <FaMobileAlt className="text-indigo-600 text-5xl mb-2" />,
    label: "Mobile Features",
    value: 4,
    description: "React Native components and features",
  },
  {
    icon: <FaCode className="text-red-500 text-5xl mb-2" />,
    label: "Code Contributions",
    value: 350,
    description: "Pull requests and code reviews completed",
  },
];

export default function TechStatisticsSection() {
  const whatsappLink = "https://wa.me/+2347034418309";

  return (
    <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
        >
          Development Journey
        </motion.h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-8" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Key milestones and achievements from our first two years as a
          professional tech soluctions provider.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center border border-gray-100"
            >
              <div className="mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="mt-1 text-md font-semibold text-gray-700">
                {stat.label}
              </h3>
              <p className="mt-1 text-xs text-gray-500 text-center">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <p className="text-gray-600 mb-6">
            Ready to collaborate or discuss a project?
          </p>
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-green-700 transition-colors duration-200"
          >
            <FaWhatsapp className="mr-2" size={16} />
            Let's Connect
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
