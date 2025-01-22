import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        department: v.string(),
        faculty: v.string(),
        year: v.string(),
        mobile: v.string(),
        enrolmentIno: v.string(),
        profilePicture: v.string(),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {

        // You might want to add validation here
        const studentId = await ctx.db.insert('students', {
            name: args.name,
            email: args.email,
            department: args.department,
            faculty: args.faculty,
            enrolmentIno: args.enrolmentIno,
            profilePicture: args.profilePicture,
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
