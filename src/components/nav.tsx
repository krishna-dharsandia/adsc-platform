"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { NavItem } from "../types/marketing";
import { UserButton, useUser } from "@clerk/nextjs";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Resources", href: "/resources" },
  { label: "About Us", href: "/about" },
  { label: "Join Us", href: "/join" },
];

export function Nav() {
  const { isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 left-0 right-0 z-50 w-full"
      style={{
        background: `
          linear-gradient(
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.9)
          ),
          url(https://assets.aceternity.com/noise.webp)
      `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Yellow accent elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl " />
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl" />

      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-between h-16 px-4 md:px-0">
          <Link href="/" className="font-bold text-xl relative z-10">
            WOOKIES
          </Link>

          {/* Mobile menu toggle button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-black transition-colors relative z-10"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 relative z-10">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Authentication buttons */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link
              href="/sign-in"
              className="hidden md:block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-lg rounded-lg p-4 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link
                href="/sign-in"
                className="block bg-black text-white px-4 py-2 rounded-md text-center hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
