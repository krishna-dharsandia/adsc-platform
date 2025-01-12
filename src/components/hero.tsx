'use client'

import { motion } from "framer-motion";
import { HeroProps } from "../types/marketing";
import { Button } from "@/components/ui/button";
import Image from "next/image"

export function Hero({ title, subtitle }: HeroProps) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen flex flex-col items-center justify-center text-center pt-16"
            style={{
                background: `
                    linear-gradient(
                        rgba(255, 255, 255, 0.9),
                        rgba(255, 255, 255, 0.9)
                    ),
                    url(https://assets.aceternity.com/noise.webp)
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Yellow accent elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl" />

            <div className="container mx-auto relative z-10">
                <motion.h1
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4 justify-center"
                >
                    <Button
                        size="lg"
                        className="bg-black hover:bg-gray-800 text-white"
                    >
                        Get in Touch →
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-black text-black hover:bg-gray-50"
                    >
                        Learn More
                    </Button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-[400px] w-4/5 rounded-lg overflow-hidden mt-16"
            >
                <Image
                    src="/images/landing-coll.jpg"
                    alt="Team collaboration"
                    quality={100}
                    fill
                    className="object-cover rounded-lg"
                    priority
                />
            </motion.div>
        </motion.section>
    )
}