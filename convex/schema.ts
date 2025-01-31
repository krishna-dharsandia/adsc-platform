import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  students: defineTable({
    name: v.string(),
    profilePicture: v.string(),
    enrolmentIno: v.string(),
    email: v.string(),
    mobile: v.string(),
    faculty: v.string(),
    department: v.string(),
    program: v.string(),
    year: v.string(),
    clerkId: v.string(),
  }),
});
