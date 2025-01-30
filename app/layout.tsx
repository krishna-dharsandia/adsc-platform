import React from "react";
import type { Metadata } from "next";
import { Inter, Silkscreen } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/providers/ConvexClientProviders";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "ADSC - Empowering Student Developers at Atmiya University",
  description: `Welcome to ADSC! We are a community of passionate student developers at Atmiya University, dedicated to fostering innovation, collaboration, and growth. Through events, workshops, and guidance, we aim to empower students with technical skills and real-world knowledge.`,
  creator: "Atmiya Developer Student  Club",
  applicationName: "Atmiya Developer Student  Club",
  keywords: ["ADSC", "Atmiya Developer Student Club", "Student Developer Community", "Software Development", "Tech Workshops", "Developer Guidance", "Atmiya University", "Programming Events"],
  icons: {
    icon: "./favicon.ico",
    apple: "/ADSC-Icons/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/ADSC-Icons/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/ADSC-Icons/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://www.adsc.com",
    title: "ADSC - Empowering Student Developers at Atmiya University",
    description: `Join ADSC, Atmiya University's premier student developer club, where innovation meets collaboration. Discover a community built to support aspiring developers through events, mentorship, and cutting-edge technologies.`,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 628,
        alt: "ADSC - Atmiya Developer Student Club",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${silkscreen.variable} relative`}>
          <main>
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
          </main>
          <div className="main-mask pointer-events-none absolute inset-0 -z-50" />
        </body>
      </html>
    </ClerkProvider>
  );
}
