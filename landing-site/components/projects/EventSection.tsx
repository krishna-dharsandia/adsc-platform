import Projects from "./Projects";

const EventsSection = () => {
  return (
    <section className="relative py-24">
      <div className="mb-12 space-y-8 px-6 md:mb-0 xl:px-56">
        <h2 className="h2-bold">Events</h2>
        <p className="regular-paragraph max-w-[835px]">
          At <span className="text-yellow-600">ADSC</span>, we organize interactive workshops, tech talks, hackathons, and hands-on sessions to empower students and foster collaboration. Explore our latest events and initiatives designed to spark innovation and learning.
        </p>
      </div>

      <Projects />

      <div className="projects-grid-pattern-bottom absolute bottom-0 -z-10 h-48 w-full" />
    </section>
  );
};
export default EventsSection;
