"use server";

import { contactSchema } from "@/lib/validators/contact.schema";
import { sendMail } from "@/lib/3p-api/php-mailer";
import { verifyCaptcha } from "@/lib/verifyCaptcha";
import { getEmailTemplate } from "@/lib/emailTemplateResolver";
import {
  saveEmail,
  markEmailSent,
  markEmailFailed,
} from "@/lib/services/mail.service";

export async function sendMailAction(formData: unknown) {
  const data = contactSchema.parse(formData);
  let fromEmail = data.fromEmail;
  let fromName = data.fromName;

  // 🔐 captcha check
  const isHuman = await verifyCaptcha(data.token);
  if (!isHuman) throw new Error("Captcha failed");

  // Generate email HTML
  const html = getEmailTemplate(data);
  // 💾 save email to DB
  const emailDoc = await saveEmail({
    to: data.email,
    fromEmail,
    fromName,
    subject: data.subject,
    html,
    message: data.message,
    templateKey: data.templateKey,
  });

  try {
    // Send email
    await sendMail({
      to: data.email,
      subject: data.subject,
      html,
      fromEmail,
      fromName,
    });

    //Mark as SENT
    await markEmailSent(emailDoc._id.toString());
  } catch (error: any) {
    // Mark as FAILED
    await markEmailFailed(
      emailDoc._id.toString(),
      error?.message || "Mail sending failed"
    );

    throw error;
  }
}
