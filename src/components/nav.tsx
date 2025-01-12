'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { NavItem } from "../types/marketing"

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Projects", href: "/projects" },
    { label: "Resources", href: "/resources" },
    { label: "About Us", href: "/about" },
    { label: "Join Us", href: "/join" },
];

export function Nav() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="top-0 left-0 right-0 z-50 w-full"
            style={{
                background: `
                    linear-gradient(
                        rgba(255, 255, 255, 0.9),
                        rgba(255, 255, 255, 0.9)
                    ),
                    url(https://assets.aceternity.com/noise.webp)
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
            }}
        >
            {/* Yellow accent elements with reduced size and opacity */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl" />

            {/* Container with higher z-index to stay above the blur effects */}
            <div className="container mx-auto relative z-10">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="font-bold text-xl relative z-10">
                        WOOKIES
                    </Link>
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
                    <Link
                        href="/login"
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors relative z-10"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </motion.header>
    )
}