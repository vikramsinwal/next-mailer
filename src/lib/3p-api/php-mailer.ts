export interface SendMailParams {
  to: string;
  subject: string;
  html: string;
  fromEmail?: string;
  fromName?: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
  fromEmail,
  fromName,
}: SendMailParams) => {
  const apiUrl = process.env.MAIL_API_URL;

  if (!apiUrl) {
    throw new Error("MAIL_API_URL is not configured");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      // Optional security
    //   ...(process.env.MAIL_API_KEY && {
    //     "X-API-KEY": process.env.MAIL_API_KEY,
    //   }),
    },
    body: JSON.stringify({
      to,
      subject,
      message: html, // PHP API expects "message"
      fromEmail,
      fromName,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Email API failed");
  }

  return data;
};
