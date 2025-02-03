import Image from "next/image";

const ProjectCard = ({ src, title }: { src: string; title: string }) => {
  return (
    <div className="z-10 h-auto w-full max-w-[500px] overflow-hidden rounded-xl shadow-2xl md:mt-32">
      <Image src={src} alt={title} layout="responsive" width={500} height={400} className="size-full bg-cover bg-center" />
    </div>
  );
};
export default ProjectCard;
