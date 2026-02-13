import { mailTransporter } from "@/lib/api/mailer";
import { connectDB } from "@/lib/db/connect";
import { InquiryModel } from "@/lib/db/models/Inquiry";

interface InquiryParams {
  fullName: string;
  currentCity: string;
  email: string;
  contactNumber: string;
  category: string;
  categoryName?: string;
  subCategory: string;
  subCategoryName?: string;
  message?: string;
}

export async function saveInquiry(data: InquiryParams) {
  await connectDB();

  return InquiryModel.create({
    ...data,
    status: "pending",
  });
}

export async function markInquiryEmailSent(id: string) {
  await connectDB();
  return InquiryModel.findByIdAndUpdate(id, { status: "sent" });
}

export async function markInquiryEmailFailed(id: string, error: string) {
  await connectDB();
  return InquiryModel.findByIdAndUpdate(id, {
    status: "failed",
    error,
  });
}

export async function sendInquiryMail(data: InquiryParams): Promise<void> {
  await mailTransporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: process.env.SUPPORT_EMAIL!,
    subject: `New Certification Inquiry from ${data.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px;">
            🎓 New Certification Inquiry
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; margin-bottom: 15px;">Personal Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold; width: 40%;">Full Name:</td>
                <td style="padding: 10px; background-color: #fff;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Email:</td>
                <td style="padding: 10px; background-color: #fff;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Contact Number:</td>
                <td style="padding: 10px; background-color: #fff;">${data.contactNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Current City:</td>
                <td style="padding: 10px; background-color: #fff;">${data.currentCity}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; margin-bottom: 15px;">Certification Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold; width: 40%;">Category:</td>
                <td style="padding: 10px; background-color: #fff;">${data.categoryName || data.category}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Sub Category:</td>
                <td style="padding: 10px; background-color: #fff;">${data.subCategoryName || data.subCategory}</td>
              </tr>
            </table>
          </div>

          ${
            data.message
              ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; margin-bottom: 15px;">Message</h3>
            <div style="padding: 15px; background-color: #f9fafb; border-left: 4px solid #667eea; border-radius: 5px;">
              ${data.message}
            </div>
          </div>
          `
              : ""
          }

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This inquiry was submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `,
  });
}

// Optional: Send confirmation email to customer
export async function sendCustomerConfirmationMail(
  data: InquiryParams,
): Promise<void> {
  await mailTransporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Thank you for your Certification Inquiry",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px;">
            Thank You for Your Inquiry!
          </h2>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Dear ${data.fullName},
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Thank you for your interest in our certification program: <strong>${data.categoryName || data.category}</strong> - <strong>${data.subCategoryName || data.subCategory}</strong>.
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            We have received your inquiry and our team will get back to you within 24-48 hours with more information.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f0f4ff; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #667eea; font-weight: bold;">
              📧 You will receive a detailed response at: ${data.email}
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            Best regards,<br>
            <strong>${process.env.SMTP_FROM_NAME || "The Team"}</strong>
          </p>
        </div>
      </div>
    `,
  });
}
