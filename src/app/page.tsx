// Add the "use client" directive at the top of the file
"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work-section";
import { Nav } from "@/components/nav";
import { ArrowUp } from "lucide-react";

export default function Home() {
  // State to track the visibility of the scroll-to-top button
  const [isVisible, setIsVisible] = useState(false);

  // Show the scroll-to-top button when the page is scrolled down 100px
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-5">
      <Nav />
      <Hero
        title="Atmiya Developer Student Club"
        subtitle="Learning, Innovating, and Growing Together."
      />
      <About />
      <ServicesSection />
      <WorkSection />

      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition duration-300"
          aria-label="Scroll to Top"
        >
          <ArrowUp size={24} /> {/* Icon size can be customized */}
        </button>
      )}
    </main>
  );
}
