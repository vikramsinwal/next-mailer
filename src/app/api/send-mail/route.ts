import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators/contact.schema";
// import { sendMail } from "@/lib/mailer";
import { sendMail } from "@/lib/services/mail.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Zod validation
    const data = contactSchema.parse(body);

    await sendMail({
      to: data.email,
      subject: "Thanks for contacting us",
      html: `
        <h2>Hello ${data.email || "User"}</h2>
        <p>${data.message}</p>
        <p>We will contact you soon.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // ❌ Zod validation error
    if (error instanceof Error && "issues" in error) {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong while sending email" },
      { status: 500 }
    );
  }
}
