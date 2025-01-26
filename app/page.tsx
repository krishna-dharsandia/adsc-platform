import About from "@/components/about/About";
import Articles from "@/components/articles/Articles";
import Contact from "@/components/contact/Contact";
import Hero from "@/components/hero/Hero";
import EventSection from "@/components/projects/EventSection";
import Reviews from "@/components/review/Reviews";
import Techs from "@/components/techs/Techs";
import CoreTeam from "@/components/core-team/CoreTeam";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Techs />
      <EventSection />
      <Articles />
      <CoreTeam />
      <Reviews />
      <Contact />
    </>
  );
}
