"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCode } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Solutions" },
    { href: "/portfolio", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
  ];

  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isMounted && scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">ASC-CM</span>
              <FaCode className="ml-2 text-gray-900" size={18} />
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-blue-600 font-medium text-sm uppercase tracking-wider transition duration-300 relative group whitespace-nowrap px-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="md:hidden text-gray-800 focus:outline-none p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Reduced Width */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-56 bg-white shadow-xl z-50 p-4 space-y-4 overflow-y-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaCode className="text-blue-900" size={16} />
                <span className="text-lg font-bold text-blue-900">ASC-CM</span>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-800 hover:text-blue-600 font-medium text-sm uppercase tracking-wider transition py-2 border-b border-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
