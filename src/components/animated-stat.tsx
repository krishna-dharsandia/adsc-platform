'use client'

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface AnimatedStatProps {
    label: string;
    percentage: number;
}

export function AnimatedStat({ label, percentage }: AnimatedStatProps) {
    const [currentPercentage, setCurrentPercentage] = useState<number>(0);
    const controls = useAnimation();
    const controls2 = useAnimation();
    const isAnimating = useRef(false);

    useEffect(() => {
        if (isAnimating.current) return;

        isAnimating.current = true;
        const startTime = performance.now();
        const duration = 4000;

        const animate = () => {
            const now = performance.now();
            const progress = Math.min((now - startTime) / duration, 1);

            const nextPercentage = Math.round(percentage * progress);
            setCurrentPercentage(nextPercentage);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isAnimating.current = false;
            }
        };

        // Start both animations together
        controls.start({
            height: `${percentage}%`,
            transition: { duration: 4, ease: "easeInOut" }
        });

        controls2.start({
            bottom: `${percentage}%`,
            opacity: 1,
            transition: { duration: 4, ease: "easeInOut" }
        });

        requestAnimationFrame(animate);

        return () => {
            isAnimating.current = false;
        };
    }, [percentage, controls, controls2]);

    return (
        <div className="relative">
            <div className="relative w-full h-52">
                <div
                    className="absolute bottom-0 left-0 w-full h-full bg-transparent"
                />

                <motion.div
                    initial={{ height: 0 }}
                    animate={controls}
                    className="absolute bottom-0 left-0 w-full bg-[#f5f5f3]"
                    style={{
                        borderTop: '2px solid #2e2e2e',
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, bottom: 0 }}
                    animate={controls2}
                    className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1"
                    style={{
                        marginBottom: '8px',
                    }}
                >
                    <motion.span className="font-medium text-sm">{currentPercentage}%</motion.span>
                </motion.div>
            </div>

            <div className="mt-2">
                <span className="text-sm text-gray-500">{label}</span>
            </div>
        </div>
    );
}