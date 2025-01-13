"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const works = [
  {
    category: "Hackathon Success",
    title: "Innovators Club Wins First Prize at CodeFest 2024",
    description:
      "Developed an AI-based project that earned first place in the prestigious CodeFest 2024, showcasing innovation and teamwork within a competitive environment.",
    percentage: 95,
    image: "/images/work-2.jpg",
  },
  {
    category: "Skill-Building Workshop",
    title: "Building Web Applications Workshop Attracts 200+ Students",
    description:
      "Organized a hands-on workshop on web development that equipped over 200 students with skills in React, Node.js, and MongoDB, fostering technical growth and collaboration.",
    percentage: 80,
    image: "/images/workshop.jpg",
  },
  {
    category: "Open Source Collaboration",
    title: "TechSavvy Club Contributes to Open Source Projects",
    description:
      "Successfully contributed to major open-source projects, earning recognition in the global developer community and helping students gain real-world experience.",
    percentage: 70,
    image: "/images/work-1.jpg",
  },
  {
    category: "Career Mentorship",
    title: "Student Mentorship Program Boosts Internship Success Rates",
    description:
      "Implemented a mentorship program that increased internship placements by 60%, providing students with guidance in resume building, interview prep, and skill enhancement.",
    percentage: 60,
    image: "/images/mentorship.jpg",
  },
];

export function WorkSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-left">
            Our Work
          </h2>
          <p className="text-gray-600 text-base sm:text-lg text-left">
            Our work combines creativity and data-driven strategies to deliver
            impactful digital marketing campaigns that drive growth.
          </p>
        </motion.div>

        {/* Work Items */}
        <div className="space-y-16 sm:space-y-24">
          {works.map((work, index) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                index % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
              }`}
            >
              {/* Text Content */}
              <div className="space-y-4">
                <span className="inline-block text-sm font-medium text-gray-600 mb-2">
                  {work.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {work.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {work.description}
                </p>
                <Button variant="outline" className="group mt-4">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Image Content */}
              <div className="relative">
                <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
                  <Image
                    src={work.image}
                    alt={work.title}
                    quality={100}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-1 shadow-lg">
                    <span className="text-sm font-semibold text-emerald-600">
                      +{work.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-20 text-center"
        >
          <Button variant="outline" size="lg" className="group">
            Show More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
