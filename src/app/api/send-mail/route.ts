import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators/contact.schema";
import { sendMail } from "@/lib/services/mail.service";

export async function POST(req: Request) {
  try {
    // ✅ Read multipart/form-data
    const formData = await req.formData();

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // ✅ Zod validation
    const data = contactSchema.parse(payload);

    // ✅ Handle attachment (optional)
    const file = formData.get("file") as File | null;
    const attachments = [];

    if (file) {
      // Optional size check (10 MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size exceeds 10MB" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    // ✅ Send mail
    await sendMail({
      to: data.email,
      subject: "Thanks for contacting us",
      html: `
        <h2>Hello ${data.fromName || "User"}</h2>
        <p>${data.message}</p>
        <p>We will contact you soon.</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // ❌ Zod validation error
    if (error?.issues) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Mail Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while sending email" },
      { status: 500 }
    );
  }
}
