"use client";

import { motion } from "framer-motion";
import { AnimatedStat } from "./animated-stat";

const stats = [
  { label: "Active Members", percentage: 92 },
  { label: "Workshop Attendance", percentage: 88 },
  { label: "Project Completion Rate", percentage: 84 },
  { label: "Hackathon Participation", percentage: 76 },
  { label: "Skill Improvement", percentage: 89 },
];

export function About() {
  return (
    <section className="py-16 sm:py-2 mt-0 mb-0 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-8 sm:space-y-0"
          >
            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                About us
              </h2>
            </div>

            {/* Description */}
            <div className="max-w-full sm:max-w-xl text-center sm:text-left">
              <p className="text-gray-200 text-base sm:text-lg lg:text-xl">
                ADSC is like a tech-savvy family within Atmiya University, all
                geared up to explore the tech universe. Our main gig? Boosting
                each other&apos;s developer skills and actually using what we
                learn.
              </p>
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl mt-4">
                Think of us as the cool kids organizing a bunch of exciting
                stuff – webinars, hands-on workshops, talks – you name it. But
                our goal is more than just sharing info, it&apos;s about
                building a community.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-12 lg:gap-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full text-center"
              >
                <AnimatedStat {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
