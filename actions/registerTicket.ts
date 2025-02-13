"use server";

import { getConvexClient } from "@/lib/convex";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";

export type StripeCheckoutMetaData = {
  eventId: Id<"events">;
  userId: string;
  waitingListId: Id<"waitingList">;
};

export async function registerTicket({ eventId }: { eventId: Id<"events"> }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const convex = getConvexClient();

  // Get event details
  const event = await convex.query(api.events.getById, { eventId });
  if (!event) throw new Error("Event not found");

  // Get waiting list entry
  const queuePosition = await convex.query(api.waitingList.getQueuePosition, {
    eventId,
    userId,
  });

  try {
    if (queuePosition) {
      const result = await convex.mutation(api.events.purchaseTicket, {
        eventId: eventId,
        userId: userId,
        waitingListId: queuePosition._id,
        paymentInfo: {
          paymentIntentId: "",
          amount: 0,
        },
      });
      console.log("Purchase ticket mutation completed:", result);
      return { status: true };
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
}
