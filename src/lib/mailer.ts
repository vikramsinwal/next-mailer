// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT), // 465
//   secure: true, // ✅ REQUIRED for SSL
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export interface SendMailParams {
//   to: string;
//   subject: string;
//   html: string;
// }

// export const sendMail = async ({
//   to,
//   subject,
//   html,
// }: SendMailParams) => {
//   return transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to,
//     subject,
//     html,
//   });
// };


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT), // 465
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface SendMailParams {
  to: string;
  subject: string;
  html: string;

  /** Optional overrides */
  fromEmail?: string;   // sender email (dynamic)
  fromName?: string;    // sender name
  replyTo?: string;     // reply-to email
}

export const sendMail = async ({
  to,
  subject,
  html,
  fromEmail,
  fromName,
  replyTo,
}: SendMailParams) => {
  const fromAddress = `${fromName} <${fromEmail}>`

  return transporter.sendMail({
    from: fromAddress,
    to,
    subject,
    html,

    // ✅ Optional but recommended headers
    replyTo: replyTo ?? fromEmail,
    headers: {
      "X-Mailer": "Next-Mailer",
      "X-App-Name": "Infinity Coding Contact Form",
    },
  });
};
