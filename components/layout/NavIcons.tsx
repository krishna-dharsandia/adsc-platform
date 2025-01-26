import Image from "next/image";
import Link from "next/link";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-4 md:gap-4">
      <Link href="https://www.instagram.com/adsc.atmiya" className="group flex items-center justify-center gap-x-1.5" target="_blank">
        <Image src="/icons/instagram.svg" alt="Link to ADSC's gitHub profile" width={25} height={25} />
        <span className="hidden text-xs text-white opacity-50 transition group-hover:opacity-100 md:inline">Instagram</span>
      </Link>
      <Link href="https://www.linkedin.com/company/adsc-atmiya-university" className="group flex items-center justify-center gap-x-1.5" target="_blank">
        <Image src="/icons/linkedin.svg" alt="Link to ADSC's linkedin profile" width={28} height={28} />
        <span className="hidden text-xs text-white opacity-50 transition group-hover:opacity-100 md:inline">LinkedIn</span>
      </Link>
    </div>
  );
};
export default NavIcons;
