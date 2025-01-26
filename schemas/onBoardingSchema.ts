import { z } from "zod";

export const onBoardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid phone number"),
  department: z.string().min(1, "Please select a department"),
  faculty: z.string().min(1, "Please select a faculty"),
  year: z.string().min(1, "Please select a year"),
});
