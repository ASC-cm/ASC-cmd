"use client";

import { motion } from "framer-motion";
import SectionTitle from "./common/SectionTitle";
import Card from "./common/Card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "Their web development expertise helped us scale our platform to handle 10x more traffic.",
      rating: 5,
    },
    {
      name: "Michael Lee",
      role: "CTO, FinEdge Solutions",
      content:
        "Impressed with their attention to detail and ability to deliver before deadlines.",
      rating: 4,
    },
    {
      name: "Amina Yusuf",
      role: "Founder, EduPro Africa",
      content:
        "Their team built us a responsive school management system that parents and staff love.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Client Testimonials"
          subtitle="What Our Clients Say"
          description="Hear from businesses we've helped grow"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              <Card className="p-6 shadow-lg hover:shadow-xl transition duration-300 rounded-xl bg-white">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
