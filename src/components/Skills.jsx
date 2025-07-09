"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./common/SectionTitle";

const SKILLS = [
  { name: "Next.js", level: 95, category: "Frontend" },
  { name: "React", level: 90, category: "Frontend" },
  { name: "Vite + React", level: 85, category: "Frontend", tag: "Modern" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Django", level: 75, category: "Backend" },
  { name: "Python", level: 85, category: "Backend" },
  { name: "PostgreSQL", level: 80, category: "Database" },
  { name: "Supabase", level: 75, category: "Database" },
  { name: "REST API", level: 85, category: "API" },
  { name: "GraphQL", level: 70, category: "API" },
  { name: "Git", level: 85, category: "DevOps" },
  { name: "GitHub", level: 90, category: "DevOps" },
  { name: "AWS", level: 65, category: "Cloud" },
  { name: "Vercel", level: 80, category: "Cloud" },
  { name: "Render", level: 70, category: "Cloud" },
];

const CATEGORIES = [...new Set(SKILLS.map((skill) => skill.category))];

const Skills = () => {
  const sectionRef = useRef(null);
  const skillRefs = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      skillRefs.current = skillRefs.current.slice(0, SKILLS.length);
    }
  }, []);

  return (
    <section className="py-12 bg-gray-50" ref={sectionRef} id="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          title="Technical Stack"
          subtitle="Our Expertise"
          description="Comprehensive skillset covering all aspects of modern web development"
        />

        <div className="mt-20 space-y-16">
          {CATEGORIES.map((category, catIndex) => (
            <CategorySection
              key={category}
              category={category}
              catIndex={catIndex}
              skills={SKILLS.filter((skill) => skill.category === category)}
              skillRefs={skillRefs}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategorySection = ({ category, catIndex, skills, skillRefs }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    transition={{ duration: 0.6, delay: catIndex * 0.15 }}
    className="skill-category"
  >
    <h3 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b border-gray-200">
      <span className="bg-blue-100 text-blue-800 text-sm font-semibold mr-3 px-3 py-1 rounded-full">
        {category}
      </span>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skills.map((skill, index) => (
        <SkillItem
          key={`${category}-${skill.name}`}
          skill={skill}
          index={index}
          skillRefs={skillRefs}
        />
      ))}
    </div>
  </motion.div>
);

const SkillItem = ({ skill, index, skillRefs }) => (
  <motion.div
    ref={(el) => (skillRefs.current[index] = el)}
    className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">{skill.name}</span>
        {skill.tag && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {skill.tag}
          </span>
        )}
      </div>
      <span className="text-gray-600 font-medium">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{
          duration: 1.2,
          delay: index * 0.15,
          ease: "easeOut",
        }}
      />
    </div>
  </motion.div>
);

export default Skills;
