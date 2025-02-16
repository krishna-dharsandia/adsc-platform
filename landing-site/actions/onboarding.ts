"use server";

import { clerkClient } from "@clerk/nextjs/server";
import * as z from "zod";
import { onBoardingSchema } from "@/schemas/onBoardingSchema";

interface OnboardingResponse {
  values: z.infer<typeof onBoardingSchema>;
  userId: string;
}

export async function handleOnboarding({ values, userId }: OnboardingResponse) {
  const clerk = await clerkClient();

  try {
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    return {
      title: "Registration Successful!",
      description: `Welcome ${values.name}!`,
    };
  } catch (error: any) {
    return {
      title: "Registration Failed",
      description: error.message,
      variant: "destructive",
    };
  }
}
