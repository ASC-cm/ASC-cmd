"use client";

import { motion } from "framer-motion";

const animationVariants = [
  { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 } },
];

const contactOptions = [
  {
    icon: "💬",
    title: "Chat my support",
    description: "i am here to help",
    link: "https://wa.me/+2347034418309",
    linkText: "Chat on Whatsapp",
  },
  {
    icon: "📧",
    title: "Send me a mail",
    description: "Speak to me via mail",
    link: "mailto:anisimon755@yahoo.com",
    linkText: "anisimon755@yahoo.com",
  },
  {
    icon: "📞",
    title: "Call me",
    description: "Mon-Sat from 8am to 6pm",
    link: "tel:+2347034418309",
    linkText: "+234 7034418309",
  },
  {
    icon: "🔗",
    title: "Social Media",
    description: "Connect with me.",
    links: [
      { icon: "🌐", url: "https://web.facebook.com/asccm1995/" },
      { icon: "📸", url: "https://x.com/Aninwa_undies" },
      { icon: "🎵", url: "https://www.linkedin.com/in/ASC-cm" },
      { icon: "🕔", url: "mailto:anisimon755@gmail.com" },
    ],
  },
];

const Contact = () => {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide bg-blue-100 px-3 py-1 rounded-full">
            Get in touch
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-4 text-gray-900">
            I would like to hear from you.
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I am here to help! Whether you have questions about my services,
            need support, or want to learn more about my skills, feel free to
            reach out through any of the options below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={
                animationVariants[index % animationVariants.length].initial
              }
              animate={
                animationVariants[index % animationVariants.length].animate
              }
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-200 hover:border-blue-600 border border-gray-200 transition-all duration-300 p-6 text-center group cursor-pointer"
            >
              <div className="text-5xl mb-4 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                {option.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-3 text-sm">{option.description}</p>
              {option.link ? (
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium text-sm hover:underline"
                >
                  {option.linkText}
                </a>
              ) : (
                <div className="flex justify-center gap-3 mt-2 text-2xl">
                  {option.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
