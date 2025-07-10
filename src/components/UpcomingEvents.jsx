"use client";
import Head from "next/head";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { toast } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function UpcomingEvents() {
  const containerRef = useRef();
  const sectionRef = useRef();
  const headingRef = useRef();
  const cardRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
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
      if (!res.ok) throw new Error(data.message || "Subscription failed");
      toast.success(
        "Thank you for subscribing! Check your email for confirmation."
      );
      setEmail("");
    } catch (error) {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const events = [
    {
      id: 1,
      title: "AI & Machine Learning Summit Africa",
      date: "October 15-17, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Landmark Centre, Lagos",
      description:
        "Premier conference on AI innovations featuring hands-on workshops, keynotes from industry leaders, and the official ASC-CM tutorial session.",
      imageUrl: "/images/news.jpg",
      sourceUrl: "https://asc-cmd.vercel.app/contact",
      highlight: true,
      highlightText: "ASC-CM Tutorial Day 2",
    },
    {
      id: 2,
      title: "Next-Gen Web Development Conference",
      date: "November 5, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Virtual Event",
      description:
        "Explore the future of web development with Next.js 15, React Server Components, and emerging frameworks. Live coding sessions included.",
      imageUrl: "/images/news.jpg",
      sourceUrl: "https://asc-cmd.vercel.app/contact",
    },
    {
      id: 3,
      title: "Cloud Native & DevOps Africa",
      date: "February 20-22, 2026",
      time: "8:30 AM - 4:30 PM",
      location: "Sandton Convention Centre, Johannesburg",
      description:
        "Comprehensive workshop on Kubernetes, serverless architectures, and modern DevOps practices with real-world case studies.",
      imageUrl: "/images/news.jpg",
      sourceUrl: "https://asc-cmd.vercel.app/contact",
    },
  ];

  useGSAP(
    () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        });
      });

      if (window.innerWidth > 768) {
        gsap.to(sectionRef.current, {
          y: () => -ScrollTrigger.maxScroll(window) * 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  const handleLearnMoreClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Head>
        <title>Upcoming Tech Events | ASC-cm</title>
        <meta
          name="description"
          content="Discover upcoming technology events featuring the ASC-CM tutorial and other cutting-edge tech conferences."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={sectionRef}
          className="py-7 sm:py-16 md:py-20 lg:py-9 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2
                ref={headingRef}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Upcoming <span className="text-blue-600">Tech Events</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Discover cutting-edge technology conferences and workshops,
                including our exclusive ASC-CM tutorial session.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white ${
                    event.highlight ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {event.highlight && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      {event.highlightText}
                    </div>
                  )}
                  <div className="h-48 sm:h-56 md:h-48 lg:h-56 overflow-hidden relative">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-5 line-clamp-3">
                      {event.description}
                    </p>
                    <button
                      onClick={() => handleLearnMoreClick(event.sourceUrl)}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                    >
                      Register Now
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for announcements about upcoming
                events, including more ASC-CM tutorial sessions.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




// "use client";
// import Head from "next/head";
// import { useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import Image from "next/image";
// import { toast } from "react-hot-toast";

// // Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger, useGSAP);

// export default function UpcomingEvents() {
//   const containerRef = useRef();
//   const sectionRef = useRef();
//   const headingRef = useRef();
//   const cardRefs = useRef([]);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

//   const events = [
//     {
//       id: 1,
//       title: "AI & Machine Learning Summit Africa",
//       date: "October 15-17, 2025",
//       time: "9:00 AM - 5:00 PM",
//       location: "Landmark Centre, Lagos",
//       description:
//         "Premier conference on AI innovations featuring hands-on workshops, keynotes from industry leaders, and the official ASC-CM tutorial session.",
//       imageUrl: "/images/news.jpg",
//       sourceUrl: "https://asc-cmd.vercel.app/contact",
//       highlight: true,
//       highlightText: "ASC-CM Tutorial Day 2",
//     },
//     {
//       id: 2,
//       title: "Next-Gen Web Development Conference",
//       date: "November 5, 2025",
//       time: "10:00 AM - 6:00 PM",
//       location: "Virtual Event",
//       description:
//         "Explore the future of web development with Next.js 15, React Server Components, and emerging frameworks. Live coding sessions included.",
//       imageUrl: "/images/news.jpg",
//       sourceUrl: "https://asc-cmd.vercel.app/contact",
//     },
//     {
//       id: 3,
//       title: "Cloud Native & DevOps Africa",
//       date: "February 20-22, 2026",
//       time: "8:30 AM - 4:30 PM",
//       location: "Sandton Convention Centre, Johannesburg",
//       description:
//         "Comprehensive workshop on Kubernetes, serverless architectures, and modern DevOps practices with real-world case studies.",
//       imageUrl: "/images/news.jpg",
//       sourceUrl: "https://asc-cmd.vercel.app/contact",
//     },
//   ];

//   const handleSubscribe = async (e) => {
//     e.preventDefault();

//     // Validate email format
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     setLoading(true);
//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/subscribe", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Subscription failed");
//       }

//       toast.success(
//         "Thank you for subscribing! Check your email for confirmation."
//       );
//       setEmail("");
//       setSubscriptionSuccess(true);
//     } catch (error) {
//       console.error("Subscription error:", error);
//       toast.error(error.message || "Failed to subscribe. Please try again.");
//     } finally {
//       setLoading(false);
//       setIsSubmitting(false);
//     }
//   };

//   useGSAP(
//     () => {
//       // Animate cards
//       cardRefs.current.forEach((card, index) => {
//         if (!card) return;

//         gsap.from(card, {
//           y: 80,
//           opacity: 0,
//           duration: 0.6,
//           delay: index * 0.15,
//           ease: "back.out(1.2)",
//           scrollTrigger: {
//             trigger: card,
//             start: "top 80%",
//             toggleActions: "play none none none",
//           },
//         });
//       });

//       // Only apply parallax on larger screens
//       if (window.innerWidth > 768) {
//         gsap.to(sectionRef.current, {
//           y: () => -ScrollTrigger.maxScroll(window) * 0.02,
//           ease: "none",
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: true,
//           },
//         });
//       }
//     },
//     { scope: containerRef }
//   );

//   const handleLearnMoreClick = (url) => {
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <>
//       <Head>
//         <title>Upcoming Tech Events | ASC-cm</title>
//         <meta
//           name="description"
//           content="Discover upcoming technology events featuring the ASC-CM tutorial and other cutting-edge tech conferences."
//         />
//         <meta name="robots" content="index, follow" />
//       </Head>

//       <div ref={containerRef} className="relative overflow-hidden">
//         <div
//           ref={sectionRef}
//           className="py-10 sm:py-16 md:py-20 lg:py-20 bg-gradient-to-b from-gray-50 to-white"
//         >
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12 md:mb-16">
//               <h2
//                 ref={headingRef}
//                 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
//               >
//                 Upcoming <span className="text-blue-600">Tech Events</span>
//               </h2>
//               <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                 Discover cutting-edge technology conferences and workshops,
//                 including our exclusive ASC-CM tutorial session.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {events.map((event, index) => (
//                 <div
//                   key={event.id}
//                   ref={(el) => (cardRefs.current[index] = el)}
//                   className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white ${
//                     event.highlight ? "ring-2 ring-blue-500" : ""
//                   }`}
//                 >
//                   {event.highlight && (
//                     <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
//                       {event.highlightText}
//                     </div>
//                   )}
//                   <div className="h-48 sm:h-56 md:h-48 lg:h-56 overflow-hidden relative">
//                     <Image
//                       src={event.imageUrl}
//                       alt={event.title}
//                       fill
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       priority={index < 2}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
//                       {event.title}
//                     </h3>

//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-center text-gray-600">
//                         <svg
//                           className="w-5 h-5 mr-2 flex-shrink-0"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={1.5}
//                             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                           />
//                         </svg>
//                         <span>{event.date}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <svg
//                           className="w-5 h-5 mr-2 flex-shrink-0"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={1.5}
//                             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <span>{event.time}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <svg
//                           className="w-5 h-5 mr-2 flex-shrink-0"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={1.5}
//                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={1.5}
//                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                         <span className="line-clamp-1">{event.location}</span>
//                       </div>
//                     </div>

//                     <p className="text-gray-600 mb-5 line-clamp-3">
//                       {event.description}
//                     </p>

//                     <button
//                       onClick={() => handleLearnMoreClick(event.sourceUrl)}
//                       className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
//                     >
//                       Register Now
//                       <svg
//                         className="w-4 h-4 ml-2"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M14 5l7 7m0 0l-7 7m7-7H3"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-16 text-center">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//                 Stay Updated
//               </h3>
//               <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//                 Subscribe to our newsletter for announcements about upcoming
//                 events, including more ASC-CM tutorial sessions.
//               </p>
//               <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Your email address"
//                   required
//                   className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   disabled={loading}
//                 />
//                 <button
//                   type="submit"
//                   disabled={loading || isSubmitting}
//                   className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-70"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Subscribing...
//                     </span>
//                   ) : (
//                     "Subscribe"
//                   )}
//                 </button>
//               </form>
//               <p className="mt-2 text-xs text-gray-500">
//                 We respect your privacy. Unsubscribe at any time.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
