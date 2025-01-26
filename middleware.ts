import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up", "/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Redirect to sign-in if the user is not authenticated
  if (!userId) {
    return isPublicRoute(req) ? NextResponse.next() : redirectToSignIn({ returnBackUrl: req.url });
  }

  const onboardingComplete = sessionClaims?.publicMetadata?.onboardingComplete;

  // If the user is onboarded, block access to the onboarding page
  if (req.nextUrl.pathname === "/onboarding" && onboardingComplete) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect not-onboarded users to the onboarding page
  if (!onboardingComplete && req.nextUrl.pathname !== "/onboarding") {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
