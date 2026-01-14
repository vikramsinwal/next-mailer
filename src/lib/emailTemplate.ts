import { ContactFormData } from "@/lib/validators/contact.schema";

export const emailTemplate = (data: ContactFormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${data.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="420" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          border-radius:16px;
          padding:32px;
          box-shadow:0 10px 30px rgba(0,0,0,0.08);
          text-align:center;
        ">

          <!-- Logo / Icon -->
          <tr>
            <td style="padding-bottom:16px;">
              <div style="
                width:56px;
                height:56px;
                background:#000;
                border-radius:12px;
                display:inline-flex;
                align-items:center;
                justify-content:center;
                color:#fff;
                font-size:26px;
                margin:0 auto;
              ">
                😊
              </div>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="
              font-size:22px;
              font-weight:bold;
              color:#111827;
              padding-bottom:8px;
            ">
              Please verify your email
            </td>
          </tr>

          <!-- Description -->
          <tr>
            <td style="
              font-size:14px;
              color:#6b7280;
              line-height:1.6;
              padding-bottom:24px;
            ">
              To use <strong>${data.subject}</strong>, click the verification
              button below. This helps keep your account secure.
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td style="padding-bottom:24px;">
              <a href="${data.message}"
                 style="
                   background:#2563eb;
                   color:#ffffff;
                   text-decoration:none;
                   padding:14px 24px;
                   border-radius:10px;
                   font-size:15px;
                   font-weight:bold;
                   display:inline-block;
                 ">
                Verify my account
              </a>
            </td>
          </tr>

          <!-- Footer text -->
          <tr>
            <td style="
              font-size:12px;
              color:#6b7280;
              line-height:1.6;
            ">
              You're receiving this email because you have an account.<br />
              If this wasn't you, please ignore this email.
            </td>
          </tr>

          <!-- Divider box -->
          <tr>
            <td style="padding-top:24px;">
              <div style="
                background:#f3f4f6;
                border-radius:12px;
                padding:16px;
                font-size:12px;
                color:#6b7280;
              ">
                This email was sent from your Next.js application.
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
