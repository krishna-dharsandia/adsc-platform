import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const studentId = await ctx.db.insert("students", {
      name: args.name,
      email: args.email,
      department: args.department,
      faculty: args.faculty,
      enrolmentIno: args.enrolmentIno,
      profilePicture: args.profilePicture,
      program: args.program,
      mobile: args.mobile,
      year: args.year,
      clerkId: args.clerkId,
    });

    return studentId;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
