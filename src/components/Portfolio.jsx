"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const projects = [
    {
      title: "School Website",
      description:
        "Dynamic, user-friendly platform enhancing communication for students, parents, and staff.",
      category: "Web Development",
      image: "/images/3.png",
      hoverImage: "/images/4.png",
      link: "https://legendcollegeuyo.com.ng/",
      tech: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      title: "Affiliate Marketing Platform",
      description:
        "Secure platform streamlining affiliate promotions with referral tracking and automated commission management.",
      category: "Web Application",
      image: "/images/1.png",
      hoverImage: "/images/2.png",
      link: "https://99healthtips.com/",
      tech: ["JavaScript", "Django", "Supabase"],
    },
    {
      title: "Hotel Booking System",
      description:
        "Elegant platform showcasing hospitality offerings with integrated booking functionality.",
      category: "Business Website",
      image: "/images/5.png",
      hoverImage: "/images/6.png",
      link: "https://hotel-website-nine-zeta.vercel.app/",
      tech: ["React", "Styled Components", "REST API"],
    },
  ];

  const sectionRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((project, index) => {
        gsap.from(project, {
          opacity: 0,
          y: 80,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-5 bg-white" id="portfolio" ref={sectionRef}>
      <div className="max-w-6xl mx-auto text-center mb-20">
        <motion.span
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="inline-block text-sm font-medium text-primary mb-4 tracking-wider uppercase"
        >
          Portfolio
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
        >
          Selected <span className="text-primary">Case Studies</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="text-xl text-gray-600 leading-relaxed"
        >
          A curated collection of my most impactful projects, showcasing
          innovative solutions and measurable results.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className="group relative flex flex-col h-full"
              whileHover="hover"
              initial="initial"
              variants={{
                initial: { y: 0 },
                hover: { y: -10 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-xl border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10" />

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2}
                />

                <Image
                  src={project.hoverImage}
                  alt={`${project.title} - Detailed View`}
                  fill
                  className="object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="mt-8 flex-1 flex flex-col px-2">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full">
                    {project.category}
                  </span>
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs font-medium text-gray-500">
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-6 flex-1">
                  {project.description}
                </p>

                <motion.div
                  className="mt-auto"
                  variants={{
                    initial: { opacity: 1 },
                    hover: { opacity: 1 },
                  }}
                >
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 6 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.link.includes("github")
                      ? "View Source Code"
                      : "View Live Project"}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M6.75 4.5L11.25 9L6.75 13.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.a>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
