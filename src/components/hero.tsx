"use client";

import { motion } from "framer-motion";
import { HeroProps } from "../types/marketing";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center text-white"
        style={{
          backgroundColor: "black",
        }}
      >
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
            className="text-xl mb-8 max-w-2xl mx-auto"
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
              className="bg-white hover:bg-green-500 text-black"
            >
              Get in Touch →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 bg-black text-white hover:bg-lime-300"
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
    </section>
  );
}
