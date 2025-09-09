import Link from 'next/link';
import Logo from './Logo';
import Image from 'next/image';
import { socialLinks } from '@/constants/contacts';

const Footer = () => {
  return (
    <footer className="text-center container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-16 text-left">
        {/* Logo + Social Media Column */}
        <div className="flex flex-col items-center md:items-start">
          <Logo isLogoFooter />
          <ul className="flex gap-3 mt-5">
            {socialLinks.map((socialLink) => (
              <li key={socialLink.id}>
                <Link href={socialLink.path} target="_blank" className="flex items-center gap-2">
                  <Image src={socialLink.icon} alt={socialLink.alt} width={20} height={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Legal Column */}
        <div>
          <h3 className="mb-4 font-semibold text-lg text-code">Legal</h3>
          <ul className="flex flex-col gap-3 text-gray-400">
            <li><Link href="/legal/cookies">Cookies</Link></li>
            <li><Link href="/legal/privacy">Privacy</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
          </ul>
        </div>
        {/* Sitemap Column */}
        <div>
          <h3 className="mb-4 font-semibold text-lg text-code">Sitemap</h3>
          <ul className="flex flex-col gap-3 text-gray-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/generate-image">Image Generator</Link></li>
            <li><Link href={"/sign-up"}>Sign Up</Link></li>
            <li><Link href={"/sign-in"}>Sign In</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
