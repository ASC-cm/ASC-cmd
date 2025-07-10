// app/components/Analytics.js
"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    // Check for consent
    const consent = localStorage.getItem("cookie_consent");

    // Initialize Google Tag Manager
    if (consent === "accepted" && process.env.NODE_ENV === "production") {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });

      gtag("config", process.env.NEXT_PUBLIC_GA_ID);
    }
  }, []);

  return null;
}
