import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  currentCity: z.string().min(3, "Current City is required"),
  email: z.string().email("Valid email is required"),
  contactNumber: z.string().min(10, "Contact Number is required"),
  category: z.string().min(1, "Category is required"),
  categoryName: z.string().optional(),
  subCategory: z.string().min(1, "Sub Category is required"),
  subCategoryName: z.string().optional(),
  message: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
