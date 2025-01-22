"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  CpuIcon,
  SmartphoneIcon,
  EarthIcon,
  ChartColumnIncreasingIcon,
  PenToolIcon,
} from "./icons";
import { motion } from "framer-motion";

export function ServicesSection() {
  return (
    <motion.section
      className="bg-emerald-900 py-20 px-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-5xl font-thin text-white mb-4">Our Service</h2>
          <p className="text-emerald-100 max-w-2xl">
            Our digital marketing service boosts your online presence with SEO,
            social media, and targeted ads.
          </p>
        </div>
        <div className="max-w-full">
          <HoverEffect items={services} />
        </div>
      </motion.div>
    </motion.section>
  );
}

const services = [
  {
    title: "Web & App Development",
    description:
      "Learn and build websites, e-commerce platforms, and mobile apps as part of our coding workshops.",
    link: "/services/web-development",
    icon: CpuIcon,
  },
  {
    title: "Hackathons & Competitions",
    description:
      "Participate in hackathons, coding challenges, and competitions to showcase your skills and win prizes.",
    link: "/services/hackathons",
    icon: SmartphoneIcon,
  },
  {
    title: "Tech Talks & Seminars",
    description:
      "Attend seminars and guest lectures by industry experts on emerging technologies and career growth.",
    link: "/services/tech-talks",
    icon: EarthIcon,
  },
  {
    title: "Open Source Contributions",
    description:
      "Collaborate on open-source projects and learn version control tools like Git and GitHub.",
    link: "/services/open-source",
    icon: ChartColumnIncreasingIcon,
  },
  {
    title: "Creative Coding & Projects",
    description:
      "Join creative coding sessions to build innovative projects that blend art and technology.",
    link: "/services/creative-coding",
    icon: PenToolIcon,
  },
  {
    title: "Career Guidance & Mentorship",
    description:
      "Receive mentorship from seniors and industry professionals to excel in your tech career.",
    link: "/services/career-guidance",
    icon: ChartColumnIncreasingIcon,
  },
];
