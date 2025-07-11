import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import { Toaster } from "react-hot-toast";
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = {
  siteName: "ASC-cm </>",
  metadataBase: new URL("https://asc-cm.com"),
  title: {
    default: "ASC-cm </> | Tech Solutions & Web Services",
    template: "%s | ASC-cm </>",
  },
  description:
    "We build high-quality websites, digital tools, and marketing strategies for businesses ready to grow.",
  keywords: [
    "web development",
    "tech agency",
    "SEO services",
    "digital marketing",
    "business websites",
    "ASC-cm",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "ASC-cm </> | Your Tech & Web Partner",
    description:
      "Smart web development and business automation tools tailored to your brand.",
    url: "https://asc-cm.com",
    siteName: "ASC-cm",
    images: [
      {
        url: "/images/og-tech-banner.jpg",
        width: 1200,
        height: 630,
        alt: "ASC-cm Web Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASC-cm </> | Build Smart, Grow Fast",
    description:
      "Explore ASC-cm’s tailored tech services — from websites to automation and SEO.",
    images: ["/images/twitter-card-tech.jpg"],
    site: "@ASC_cm",
    creator: "@ASC_cm",
  },
  verification: {
    google: "your-google-site-verification-code-here",
  },
};

export default function RootLayout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebDevelopmentCompany",
    name: "ASC-cm </>",
    url: "https://asc-cm.com",
    logo: "https://asc-cm.com/logo.png",
    description:
      "ASC-cm is a web development and digital marketing company providing scalable online solutions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jubilee School Road",
      addressLocality: "Uyo",
      addressRegion: "Akwa Ibom",
      postalCode: "520102",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-7034418309",
      contactType: "Customer Service",
      email: "contact@asc-cm.com.ng",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/asc.cm",
      "https://www.instagram.com/asc_cm",
      "https://twitter.com/asc_cm",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="author" content="ASC-cm </>" />
        <meta name="geo.region" content="NG-AK" />
        <meta name="geo.placename" content="Uyo" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        <Header />
        <main>{children}</main>
        <CookieBanner />
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#ffffff",
              color: "#1a1a1a",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "0.875rem",
              maxWidth: "100%",
            },
            success: {
              iconTheme: { primary: "#10B981", secondary: "#ffffff" },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#ffffff" },
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
