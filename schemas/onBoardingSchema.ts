import { z } from "zod";

export const onBoardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  enrolmentIno: z.string().min(9, "Invalid enrolment number"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid phone number"),
  faculty: z.string().min(1, "Please select a faculty"),
  department: z.string().min(1, "Please select a department"),
  program: z.string().min(1, "Please select a program"),
  year: z.string().min(1, "Please select a year"),
});
