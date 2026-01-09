import { ContactFormData } from "@/lib/validators/contact.schema";

export const emailTemplate = (data: ContactFormData) => `
  <div style="font-family:Arial;padding:20px">
    <h2 style="color:#4f46e5">${data.subject}</h2>
    <p><strong>From:</strong> ${data.fromEmail}</p>
    <hr />
    <p>${data.message}</p>
    <br/>
    <small>This email was sent from your Next.js app.</small>
  </div>
`;
