"use client"

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        description: string;
        link: string;
        icon: React.ElementType;
    }[];
    className?: string;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <Link
                    href={item?.link}
                    key={item?.link}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200  block  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card className="bg-emerald-800 border-none z-50 border border-transparent group-hover:border-slate-700 relative">
                        <CardHeader className="z-40 space-y-4">
                            <div className="bg-yellow-100 shadow-md w-10 rounded-md">
                                <item.icon />
                            </div>
                            <CardTitle className="text-white">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-white/45">{item.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="bg-transparent text-white shadow-md"
                                variant={"outline"}
                            >
                                View Event
                            </Button>
                        </CardFooter>
                    </Card>
                </Link>
            ))
            }
        </div >
    );
};

