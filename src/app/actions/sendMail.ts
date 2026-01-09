"use server";

import { contactSchema } from "@/lib/validators/contact.schema";
import { sendMail } from "@/lib/3p-api/php-mailer";
import { verifyCaptcha } from "@/lib/verifyCaptcha";
import { emailTemplate } from "@/lib/emailTemplate"

export async function sendMailAction(formData: unknown) {
    const data = contactSchema.parse(formData);
    let fromEmail = data.fromEmail;
    let fromName = data.fromName;

    // 🔐 captcha check
    const isHuman = await verifyCaptcha(data.token);
    if (!isHuman) throw new Error("Captcha failed");

    await sendMail({
        to: data.email,
        subject: data.subject,
        // html: emailTemplate(data),
        html: data.message,
        fromEmail,
        fromName,
    });
}
