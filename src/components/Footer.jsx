"use client";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      toast.success(
        "Thank you for subscribing! You'll receive our updates soon."
      );
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>ASC-cm | Digital Solutions & Web Development</title>
        <meta
          name="description"
          content="Professional web development and digital solutions tailored to your business needs"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://asc-cm.com/" />
      </Head>
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Newsletter - Maintained exact structure */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Join Our Tech Insights
              </h3>
              <p className="text-gray-400 mb-6">
                Get exclusive web development tips, project updates, and special
                offers delivered to your inbox.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md font-medium hover:from-blue-700 hover:to-blue-500 transition-all shadow-md disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </motion.button>
              </form>
              <p className="mt-2 text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* Contact Us - Same structure with ASC-cm details */}
            <div>
              <h3 className="text-2xl font-light mb-4">Contact Us</h3>
              <div className="w-10 h-0.5 bg-blue-400 mb-4"></div>
              <div className="space-y-4 text-gray-200">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p>
                      <strong>Office:</strong> 1 Jubilee School Road, Uyo,
                      Akwa Ibom State.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400 flex-shrink-0" />
                  <p>contact@asc-cm.com.ng</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-blue-400 flex-shrink-0" />
                  <p>+234 703 441 8309</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Line - Same structure */}
          <div className="border-t border-gray-600 mt-12 pt-6 text-center text-sm text-gray-400">
            <p>
              ASC-cm. Copyright © {new Date().getFullYear()} All Rights
              Reserved.
              <br className="hidden sm:inline" />
              Developed by{" "}
              <span className="text-blue-400 font-semibold">
                <Link
                  href="https://portfolio-gamma-ten-75.vercel.app/"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  ASC-cm
                </Link>
              </span>
              .
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
