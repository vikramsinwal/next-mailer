import { mailTransporter } from "@/lib/api/mailer";
import { connectDB } from "@/lib/db/connect";
import { PaymentModel } from "@/lib/db/models/Payment";
import { InquiryModel } from "@/lib/db/models/Inquiry";

interface PaymentParams {
  inquiryId: string;
  utrNumber: string;
  plan?: string;
  amount?: number;
  paymentProof: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

export async function savePayment(data: PaymentParams) {
  await connectDB();

  return PaymentModel.create({
    ...data,
    status: "pending",
  });
}

export async function sendPaymentNotificationMail(
  paymentData: PaymentParams,
  inquiryData: any,
): Promise<void> {
  // Convert base64 to buffer for attachment
  const base64Data = paymentData.paymentProof.replace(
    /^data:image\/\w+;base64,/,
    "",
  );
  const buffer = Buffer.from(base64Data, "base64");

  await mailTransporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: process.env.SUPPORT_EMAIL!,
    subject: `💰 Payment Received - ${inquiryData.fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: white; margin: 0; text-align: center;">
              💰 New Payment Received
            </h2>
            ${
              inquiryData.plan
                ? `
            <p style="color: white; margin: 10px 0 0 0; text-align: center; font-size: 16px; opacity: 0.95;">
              ${inquiryData.plan} Plan${inquiryData.amount ? ` - $${inquiryData.amount.toFixed(2)}` : ""}
            </p>
            `
                : ""
            }
          </div>

          <!-- Customer Information -->
          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              👤 Customer Information
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold; width: 40%;">Full Name:</td>
                <td style="padding: 10px; background-color: #fff;">${inquiryData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Email:</td>
                <td style="padding: 10px; background-color: #fff;">${inquiryData.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Contact:</td>
                <td style="padding: 10px; background-color: #fff;">${inquiryData.contactNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">City:</td>
                <td style="padding: 10px; background-color: #fff;">${inquiryData.currentCity}</td>
              </tr>
            </table>
          </div>

          <!-- Service Information -->
          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
              📚 Service Details
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold; width: 40%;">Category:</td>
                <td style="padding: 10px; background-color: #fff;">${inquiryData.categoryName || inquiryData.category}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Sub Category:</td>
                <td style="padding: 10px; background-color: #fff;">${inquiryData.subCategoryName || inquiryData.subCategory}</td>
              </tr>
              ${
                inquiryData.message
                  ? `
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Message:</td>
                <td style="padding: 10px; background-color: #fff;">${inquiryData.message}</td>
              </tr>
              `
                  : ""
              }
            </table>
          </div>

          <!-- Plan & Pricing (if available) -->
          ${
            inquiryData.plan || inquiryData.amount
              ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
              💵 Plan & Pricing Details
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              ${
                inquiryData.plan
                  ? `
              <tr>
                <td style="padding: 10px; background-color: #f0fdf4; font-weight: bold; width: 40%;">Selected Plan:</td>
                <td style="padding: 10px; background-color: #f0fdf4; font-weight: 700; color: #059669; font-size: 16px;">${inquiryData.plan}</td>
              </tr>
              `
                  : ""
              }
              ${
                inquiryData.amount
                  ? `
              <tr>
                <td style="padding: 10px; background-color: #f0fdf4; font-weight: bold; width: 40%;">Amount:</td>
                <td style="padding: 10px; background-color: #f0fdf4; font-weight: 700; color: #059669; font-size: 20px;">$${inquiryData.amount.toFixed(2)}</td>
              </tr>
              `
                  : ""
              }
            </table>
          </div>
          `
              : ""
          }

          <!-- Payment Information -->
          <div style="margin: 20px 0;">
            <h3 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
              💳 Payment Transaction Details
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold; width: 40%;">Transaction ID (UTR):</td>
                <td style="padding: 10px; background-color: #fff; font-family: monospace; color: #059669; font-weight: 600; font-size: 15px;">${paymentData.utrNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Inquiry ID:</td>
                <td style="padding: 10px; background-color: #fff; font-family: monospace;">${paymentData.inquiryId}</td>
              </tr>
              ${
                inquiryData.amount
                  ? `
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Expected Amount:</td>
                <td style="padding: 10px; background-color: #fff; font-weight: 600; color: #059669; font-size: 16px;">$${inquiryData.amount.toFixed(2)}</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Payment Method:</td>
                <td style="padding: 10px; background-color: #fff;">USDT (TRC20)</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Screenshot:</td>
                <td style="padding: 10px; background-color: #fff;">
                  <span style="color: #059669;">✓ Attached (${paymentData.fileName})</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f9fafb; font-weight: bold;">Submitted At:</td>
                <td style="padding: 10px; background-color: #fff;">${new Date().toLocaleString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  },
                )}</td>
              </tr>
            </table>
          </div>

          <!-- Payment Summary Box (if amount available) -->
          ${
            inquiryData.amount
              ? `
          <div style="margin: 25px 0; padding: 20px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 8px;">
            <div style="text-align: center; color: white;">
              <p style="margin: 0 0 5px 0; font-size: 14px; opacity: 0.9;">Total Payment Expected</p>
              <p style="margin: 0; font-size: 32px; font-weight: bold;">$${inquiryData.amount.toFixed(2)}</p>
              ${
                inquiryData.plan
                  ? `
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">${inquiryData.plan} Plan</p>
              `
                  : ""
              }
            </div>
          </div>
          `
              : ""
          }

          <!-- Action Required -->
          <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
            <p style="margin: 0; color: #92400e; font-weight: bold; font-size: 16px;">⚠️ Action Required:</p>
            <p style="margin: 10px 0 0 0; color: #92400e; line-height: 1.6;">
              1. Verify the payment screenshot attached to this email<br>
              2. Check if the transaction ID (<strong>${paymentData.utrNumber}</strong>) is valid${inquiryData.amount ? `<br>3. Confirm the amount matches <strong>$${inquiryData.amount.toFixed(2)}</strong>` : ""}<br>
              ${inquiryData.amount ? "4" : "3"}. Update the payment status in the admin panel<br>
              ${inquiryData.amount ? "5" : "4"}. Send confirmation to customer at <strong>${inquiryData.email}</strong>
            </p>
          </div>

          <!-- Quick Action Button -->
          <div style="margin: 25px 0; text-align: center;">
            <a href="mailto:${inquiryData.email}?subject=Payment%20Confirmation%20-%20${encodeURIComponent(inquiryData.plan || "Your Order")}" 
               style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
              ✉️ Contact Customer
            </a>
          </div>

          <!-- Footer -->
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">This is an automated notification from your system.</p>
            ${
              inquiryData.createdAt
                ? `
            <p style="margin: 10px 0 0 0;">Inquiry created: ${new Date(inquiryData.createdAt).toLocaleDateString()}</p>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: paymentData.fileName,
        content: buffer,
        contentType: paymentData.fileType,
      },
    ],
  });
}
