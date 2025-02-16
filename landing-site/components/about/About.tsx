import DotPattern from "../ui/dot-pattern";

const About = () => {
  return (
    <section className="relative flex items-center justify-center px-6 py-24">
      <div className="z-10">
        <div className="space-y-8 md:text-center">
          <h2 className="h2-bold">About ADSC</h2>
          <p className="regular-paragraph mx-auto max-w-[835px]">
            ADSC, or the <span className="text-code text-yellow-600">Atmiya Developer Students Club</span>, is a thriving community at our university that empowers students to explore their passions in <span className="text-green-700">automation</span>, <span className="text-blue-600">design</span>, and <span className="text-purple-600">technology.</span>
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-8 md:mt-24">{/* Content here can remain dynamic or updated later */}</div>
      </div>

      <DotPattern width={20} height={20} cx={1} cy={1} cr={1} className="dot-pattern opacity-50" />
    </section>
  );
};

export default About;
