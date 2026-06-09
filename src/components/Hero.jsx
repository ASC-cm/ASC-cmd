"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Hero = () => {
  const controls = useAnimation();
  const mountRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Skip Three.js on mobile
    if (isMobile) return;

    // Your existing Three.js code here...
    // (keep everything as is)
  }, [isMobile]);

  return (
    <section className="relative isolate pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center">
      {/* Only render Three.js container on desktop */}
      {!isMobile && (
        <div ref={mountRef} className="absolute inset-0 -z-10"></div>
      )}

      {/* Rest of your JSX remains the same */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/images/13.jpg"
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-primary/90 backdrop-brightness-75"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* ... rest of your content ... */}
      </div>
    </section>
  );
};

export default Hero;
