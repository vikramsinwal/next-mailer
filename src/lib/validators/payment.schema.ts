import { z } from "zod";

export const paymentSchema = z.object({
  inquiryId: z.string().min(1, "Inquiry ID is required"),
  utrNumber: z.string().min(5, "Transaction ID is required"),
  paymentProof: z.string().min(1, "Payment screenshot is required"),
  fileName: z.string(),
  fileSize: z.number().max(200 * 1024, "File size must be less than 200kb"),
  fileType: z.string(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
