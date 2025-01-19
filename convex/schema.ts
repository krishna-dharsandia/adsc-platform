import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    students: defineTable({
        name: v.string(),
        clerkId: v.string(),
        enrolmentIno: v.string(),
        profilePicture: v.string(),
        department: v.string(),
        email: v.string(),
        faculty: v.string(),
        year: v.string(),
        mobile: v.string(),
    }),
});