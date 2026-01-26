import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators/lead.schema";
import { savelead, sendEnquiryMail } from "@/lib/services/lead.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Zod validation
    const data = leadSchema.parse(body);

    await savelead({
      fullName: data.fullName,
      currentCity: data.currentCity,
      email: data.email,
      contactNumber: data.contactNumber,
      message: data.message,
    });
    await sendEnquiryMail(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    // ❌ Zod validation error
    if (error instanceof Error && "issues" in error) {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: true,
        errorMessage: error instanceof Error ? error.message : undefined,
        message: "Something went wrong while sending enquiry, Try again later",
      },
      { status: 500 },
    );
  }
}
