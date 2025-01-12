'use client'

import { motion } from "framer-motion"
import { AnimatedStat } from "./animated-stat";

const stats = [
    { label: "Active Members", percentage: 92 },
    { label: "Workshop Attendance", percentage: 88 },
    { label: "Project Completion Rate", percentage: 84 },
    { label: "Hackathon Participation", percentage: 76 },
    { label: "Skill Improvement", percentage: 89 },
]

export function About() {
    return (
        <section className="py-20">
            <div className="container mx-auto">
                <div className="max-w-5xl mx-auto space-y-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-row justify-between w-full h-auto"
                    >
                        <div>
                            <h2 className="text-5xl font-bold mb-6 items-start">About us</h2>
                        </div>
                        <div className="max-w-xl">
                            <p className="text-gray-600 max-w-xl">
                                At WOOKIES, we specialize in innovative digital marketing strategies that drive
                                results. Our team is dedicated to helping businesses grow and succeed online.
                            </p>
                            <p className="text-gray-600 max-w-2xl mt-4">
                                With talented solutions and a focus on measurable outcomes, we empower
                                brands to connect with their audience and achieve their goals in the digital
                                landscape.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="grid grid-cols-5 gap-24"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="w-full"
                            >
                                <AnimatedStat {...stat} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}