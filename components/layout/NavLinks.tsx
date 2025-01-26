import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const NavLinks = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className="mt-16 flex flex-col gap-4 font-Silkscreen text-3xl md:mt-0 md:flex-row md:text-sm">
      {isSignedIn ? (
        <UserButton />
      ) : (
        <>
          <Link className="py-4 md:py-0 md:hover:opacity-70" href="/sign-in">
            Already A Member?
          </Link>

          <Link className="py-4 md:py-0 md:hover:opacity-70" href="/sign-up">
            Join Now
          </Link>
        </>
      )}
    </nav>
  );
};
export default NavLinks;
