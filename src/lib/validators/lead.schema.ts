import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  currentCity: z.string().min(3, "Current City is required"),
  email: z.string().email("Email is required"),
  contactNumber: z.string().min(3, "Contact Number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  //token: z.string().min(1, "Captcha required"),
});

export type LeadFormData = z.infer<typeof leadSchema>;
