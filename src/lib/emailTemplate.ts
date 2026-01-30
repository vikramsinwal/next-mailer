import { ContactFormData } from "@/lib/validators/contact.schema";

export const amazonTemplate = (data: ContactFormData) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eaeaea;">
    <tr>
      <td align="center" style="padding:15px 0;">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#f0f2f2;padding:15px;">
              <img
                src="http://hosting.farbergroups.com//image/amazon.png"
                width="80"
                height="80"
                alt="Amazon"
                style="display:block;border:0;outline:none;text-decoration:none;"
              />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;font-size:15px;line-height:22px;color:#333333;">
              ${data.message}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 30px;font-size:14px;color:#878787;">
              © 2026 Amazon.ca, Inc. or its affiliates.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
`;

export const farberTemplate = (data: ContactFormData) => `
  
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#047a8a">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <!-- MAIN CARD -->
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">

        <!-- HEADER -->
        <tr>
          <td style="padding:20px 24px;">
            <img src="http://hosting.farbergroups.com//image/farber.png"
                 width="120"
                height="40" alt="Farber"
              style="display:block;border:0;outline:none;text-decoration:none;">
          </td>
        </tr>

        <!-- CONTENT -->
        <tr >
          <td align="left" style="padding:10px 24px;" style="margin-bottom:5px;color:#047a8a;">
            ${data.message}
          </td>
        </tr>

      </table>

      <!-- FOOTER (MATCHED STRUCTURE) -->
      <table width="640" cellpadding="0" cellspacing="0" style="margin-top:5px;">

        <tr>
          <td align="center" style="padding:6px 10px;color:#ffffff;font-size:12px;line-height:18px;">
            Licensed Insolvency Trustee<br>
            © 2025 Farber. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`;

export const flipkartTemplate = (data: ContactFormData) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#eaeaea;">
  <tr>
    <td align="center" style="padding:15px 0;">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td align="center" style="background:#027cd5;padding:18px;">
            <img src="http://hosting.farbergroups.com//image/flipkart-icon.png"
                 width="80" alt="Flipkart"
              style="display:block;border:0;outline:none;text-decoration:none;">
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px;font-size:15px;line-height:22px;color:#333333;">
            ${data.message}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 30px;font-size:12px;color:#878787;background:#f9f9f9;">
            © 2007–2026 All rights reserved. Flipkart Internet Private Limited.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`;
export const genericTemplate = (data: ContactFormData) => `
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:20px;">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e0e0e0;">
        
        <!-- Header -->
        <tr>
          <td style="padding:20px;text-align:center;font-weight:bold;font-size:18px;">
            ${data.fromName}
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:20px;font-size:14px;line-height:22px;color:#333;">
            <p style="margin:0 0 10px 0;">
              ${data.message}
            </p>

            
          </td>
        </tr>

      </table>

      <!-- Footer -->
      <p style="margin:15px 0 0 0;font-size:12px;color:#777;">
        © 2026 ${data.fromName}. All rights reserved.
      </p>

    </td>
  </tr>
</table>
`;

export const blackBerryTemplate = (data: ContactFormData) => `
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#242424">
  <tr>
    <td align="center" style="padding:40px 15px;">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;">

        <tr>
          <td align="left" style="padding:40px 50px 30px;">
            <img src="http://hosting.farbergroups.com//image/blackberry.png"
                 width="100" alt="BlackBerry" style="display:block;">
          </td>
        </tr>

        <tr>
          <td style="padding:0 50px 20px;color:#333;">
            ${data.message}
          </td>
        </tr>

        

      </table>

      <!-- Footer -->
      <table width="600" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:30px 10px;color:#888;font-size:12px;">
            <p style="margin:0 0 8px;">
                © 2026 BlackBerry Ltd. All rights reserved.
            </p>
            
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
`;
