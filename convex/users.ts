import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db
      .query("students")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", userId))
      .first();

    return user;
  },
});
