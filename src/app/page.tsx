import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work-section";
import { Nav } from "@/components/nav";


export default function Home() {
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-5">
      <Nav />
      <Hero
        title="Atmiya Developer Student Club"
        subtitle="Learning, Innovating, and Growing Together."
      />
      <About />
      <ServicesSection />
      <WorkSection />
    </main>
  );
}
