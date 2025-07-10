"use client";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState(null);
  const bannerRef = useRef(null);

  // Check for existing consent
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie_consent");
      const isDev = process.env.NODE_ENV === "development";

      if (!consent || isDev) {
        setVisible(true);
      } else {
        setConsentGiven(consent);
        initializeAnalytics(consent);
      }
    };

    // Delay appearance slightly for better UX
    const timer = setTimeout(checkConsent, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle body padding when banner is visible
  useEffect(() => {
    if (visible && bannerRef.current) {
      const height = bannerRef.current.offsetHeight;
      document.body.style.paddingBottom = `${height}px`;
    } else {
      document.body.style.paddingBottom = "0";
    }

    return () => {
      document.body.style.paddingBottom = "0";
    };
  }, [visible]);

  // Initialize analytics based on consent
  const initializeAnalytics = (consent) => {
    if (consent === "accepted" && typeof window !== "undefined") {
      // Initialize or enable analytics tracking
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
        });
      }
      // Add other tracking initializations here
    }
  };

  // Handle consent choice
  const handleConsent = (value) => {
    localStorage.setItem("cookie_consent", value);
    setConsentGiven(value);
    setVisible(false);
    initializeAnalytics(value);

    // Event tracking for consent decision
    if (window.gtag && value) {
      window.gtag("event", "cookie_consent", {
        event_category: "engagement",
        event_label: value,
      });
    }
  };

  // Animation variants
  const bannerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={bannerRef}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bannerVariants}
          className="fixed inset-x-0 bottom-0 z-[100] bg-white shadow-lg border-t border-gray-200"
          role="dialog"
          aria-labelledby="cookie-banner-heading"
          aria-modal="true"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="bg-blue-50 p-1.5 rounded-full">
                  <InformationCircleIcon
                    className="h-5 w-5 text-blue-600 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2
                    id="cookie-banner-heading"
                    className="text-base font-semibold text-gray-900 mb-1"
                  >
                    Your Privacy Matters
                  </h2>
                  <p className="text-sm text-gray-600">
                    We use essential cookies to make our site work. With your
                    consent, we may also use non-essential cookies to improve
                    your experience, analyze traffic, and serve personalized
                    ads.{" "}
                    <a
                      href="/privacy"
                      className="text-blue-600 underline hover:text-blue-800 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleConsent("accepted")}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm whitespace-nowrap"
                  aria-label="Accept all cookies"
                >
                  Accept All Cookies
                </button>
                <button
                  onClick={() => handleConsent("essential")}
                  className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm whitespace-nowrap"
                  aria-label="Accept essential cookies only"
                >
                  Essential Only
                </button>
              </div>

              <button
                onClick={() => handleConsent("essential")}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
                aria-label="Close cookie banner and accept essential cookies only"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
