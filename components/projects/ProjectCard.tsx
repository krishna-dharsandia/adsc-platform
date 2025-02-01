import Image from "next/image";

const ProjectCard = ({ src, title }: { src: string; title: string }) => {
  return (
    <div className="z-10 h-[400px] w-[500px] overflow-hidden rounded-xl shadow-2xl md:mt-32">
      <Image src={src} alt={title} width={500} height={400} className="size-full bg-cover bg-center" />
    </div>
  );
};
export default ProjectCard;
