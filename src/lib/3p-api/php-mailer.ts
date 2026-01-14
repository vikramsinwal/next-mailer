export interface SendMailParams {
  to: string;
  subject: string;
  html: string;
  fromEmail?: string;
  fromName?: string;
  attachments?: any[]; // 👈 real File objects
}

export const sendMail = async ({
  to,
  subject,
  html,
  fromEmail,
  fromName,
  attachments = [],
}: SendMailParams) => {
  const apiUrl = process.env.MAIL_API_URL;

  if (!apiUrl) {
    throw new Error("MAIL_API_URL is not configured");
  }

  // ✅ Build FormData
  const formData = new FormData();
  formData.append("to", to);
  formData.append("subject", subject);
  formData.append("message", html);
  if (fromEmail) formData.append("fromEmail", fromEmail);
  if (fromName) formData.append("fromName", fromName);

  // ✅ Attach files
  attachments.forEach((file) => {
    formData.append("file", file); // PHP reads $_FILES["file"]
  });

  // ✅ Send WITHOUT content-type header
  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
    // ❌ DO NOT set Content-Type
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Email API failed");
  }

  return data;
};
