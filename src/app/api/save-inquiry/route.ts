import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validators/inquiry.schema";
import {
  saveInquiry,
  sendInquiryMail,
  sendCustomerConfirmationMail,
  markInquiryEmailSent,
  markInquiryEmailFailed,
} from "@/lib/services/inquiry.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Zod validation
    const data = inquirySchema.parse(body);

    // Save inquiry to database
    const savedInquiry = await saveInquiry({
      fullName: data.fullName,
      currentCity: data.currentCity,
      email: data.email,
      contactNumber: data.contactNumber,
      category: data.category,
      categoryName: data.categoryName,
      subCategory: data.subCategory,
      subCategoryName: data.subCategoryName,
      message: data.message,
      plan: data.plan,
      amount: data.amount,
    });

    // Send emails (try-catch to not fail the request if email fails)
    try {
      await sendInquiryMail(data);

      // Optional: Send confirmation email to customer
      await sendCustomerConfirmationMail(data);

      await markInquiryEmailSent(savedInquiry._id.toString());
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      await markInquiryEmailFailed(
        savedInquiry._id.toString(),
        emailError instanceof Error ? emailError.message : "Unknown error",
      );
      // Don't throw error - inquiry is saved, just email failed
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      data: {
        id: savedInquiry._id,
        createdAt: savedInquiry.createdAt,
      },
    });
  } catch (error) {
    // ❌ Zod validation error
    if (error instanceof Error && "issues" in error) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error,
        },
        { status: 400 },
      );
    }

    console.error("Inquiry submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error: true,
        errorMessage: error instanceof Error ? error.message : undefined,
        message:
          "Something went wrong while submitting inquiry. Please try again later.",
      },
      { status: 500 },
    );
  }
}

// Optional: GET endpoint to retrieve inquiries (for admin panel)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    // Add authentication check here in production

    // ... implement retrieval logic

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve inquiries" },
      { status: 500 },
    );
  }
}
