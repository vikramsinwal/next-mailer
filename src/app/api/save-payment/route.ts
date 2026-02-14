import { NextResponse } from "next/server";
import { paymentSchema } from "@/lib/validators/payment.schema";
import {
  savePayment,
  sendPaymentNotificationMail,
} from "@/lib/services/payment.service";
import { InquiryModel } from "@/lib/db/models/Inquiry";
import { connectDB } from "@/lib/db/connect";

// CORS headers
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Zod validation
    const data = paymentSchema.parse(body);

    // Get inquiry details
    await connectDB();
    const inquiry = await InquiryModel.findById(data.inquiryId);

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Inquiry not found",
        },
        { status: 404, headers: corsHeaders() },
      );
    }

    // Save payment
    const savedPayment = await savePayment({
      inquiryId: data.inquiryId,
      utrNumber: data.utrNumber,
      plan: data.plan,
      amount: data.amount,
      paymentProof: data.paymentProof,
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileType: data.fileType,
    });

    // Send email notification
    try {
      await sendPaymentNotificationMail(
        {
          inquiryId: data.inquiryId,
          utrNumber: data.utrNumber,
          plan: inquiry.plan,
          amount: inquiry.amount,
          paymentProof: data.paymentProof,
          fileName: data.fileName,
          fileSize: data.fileSize,
          fileType: data.fileType,
        },
        inquiry,
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Payment proof submitted successfully",
        data: {
          id: savedPayment._id,
          inquiryId: savedPayment.inquiryId,
          status: savedPayment.status,
          createdAt: savedPayment.createdAt,
        },
      },
      { headers: corsHeaders() },
    );
  } catch (error) {
    if (error instanceof Error && "issues" in error) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error,
        },
        { status: 400, headers: corsHeaders() },
      );
    }

    console.error("Payment submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit payment proof",
      },
      { status: 500, headers: corsHeaders() },
    );
  }
}
