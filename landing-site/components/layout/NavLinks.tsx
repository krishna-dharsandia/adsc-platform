import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const NavLinks = () => {
  const { isSignedIn, user } = useUser();

  // Check if the user has completed onboarding
  const isOnboarded = user?.unsafeMetadata?.onboardingComplete;

  return (
    <nav className="mt-16 flex flex-col items-center gap-4 font-Silkscreen text-3xl md:mt-0 md:flex-row md:text-sm">
      {isSignedIn ? (
        <>
          {/* Show onboarding link only if not onboarded */}
          {!isOnboarded && (
            <Link className="py-4 md:py-0 md:hover:opacity-70" href="/onboarding">
              Complete Onboarding
            </Link>
          )}

          <Link className="py-4 md:py-0 md:hover:opacity-70" href="/generate-image">
            Generate Social Post
          </Link>

          {/* Show UserButton if signed in */}
          <UserButton />
        </>
      ) : (
        <>
          {/* Show sign-in and sign-up links if not signed in */}
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
