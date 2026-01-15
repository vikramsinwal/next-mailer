import { z } from "zod";

export const contactSchema = z.object({
  fromEmail: z.string().email("Invalid sender email"),
  email: z.string().email("Invalid recipient email"),
  subject: z.string().min(3, "Subject is required"),
  fromName: z.string().min(3, "From Name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  token: z.string().min(1, "Captcha required"),
  templateKey: z.enum([
    "amazon",
    "farber",
    "flipkart",
    "generic",
    "blackberry",
  ]),
});

export type ContactFormData = z.infer<typeof contactSchema>;
