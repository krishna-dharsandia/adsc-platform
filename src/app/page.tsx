import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work-section";

export default function Home() {
  return (
    <main className="min-h-screen px-4">
      <Hero
        title="TECHNOLOGY STUDENT CLUB"
        subtitle="A vibrant student-driven community fostering innovation, collaboration, and learning in technology. We empower students to build, innovate, and excel with cutting-edge tools and resources."
      />
      <About />
      <ServicesSection />
      <WorkSection />
    </main>
  );
}
