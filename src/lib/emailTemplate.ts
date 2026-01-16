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
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/256px-Amazon_logo.svg.png"
                width="80"
                height="60"
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
            <!-- <img src="https://ed8a24f5-affe-4fc0-8e63-f6bcde0c63d5.b-cdn.net/e/43ee70ab-5bb2-40c6-bcfa-de380a267d0f/5036503a-de27-4777-957d-da84413d522d.png"
                 width="100" alt="Zendo"> -->
                 <svg xmlns="http://www.w3.org/2000/svg" width="136" height="50" viewBox="0 0 760 280" class="w-full h-auto"><g fill="#047a8a"><path d="M121.1 9.5v34.4h-72V89h67.8v34.4H49.1v70.2H6.2V9.5h115ZM166.2 196.5c-23.2 0-47.8-12.5-47.8-41.9s26.9-39.2 51.2-40.3l33.1-1.3v-2.9c0-13.9-9.9-21.1-26.9-21.1s-33.6 7.5-40.3 11.7l-11.2-27.8c11.2-5.6 31.8-13.3 56.3-13.3s38.7 5.6 49.1 15.2c10.1 9.6 15.7 22.4 15.7 44.6v74.2h-40.8l-.8-13.9c-5.6 5.6-16.3 16.8-37.6 16.8Zm-5.1-43.4c0 10.1 8.3 16.3 20 16.3s19.2-7.5 21.9-12v-21.6l-21.1 1.3c-13.1.5-20.8 6.1-20.8 16ZM303.9 62.1l-.3 18.7h.5c7.5-14.4 18.4-21.1 32.5-21.1s13.3 2.4 13.3 2.4l-2.4 39.2h-1.9c-2.4-1.3-8-3.2-15.5-3.2s-16.5 5.3-19.7 9.6c-3.2 4.3-6.7 12.8-6.7 27.5v58.4H261V62.1h42.7ZM402.8 9.5v44.3c0 8.2-.4 19.2-.6 25.4 7.1-10.3 20.8-19.6 42.2-19.6 37.9 0 61.9 29.6 61.9 68.3s-24 68.6-62.2 68.6-33.9-6.4-43.8-20.3l.3 17.3h-40.5V9.5h42.7Zm60.1 117.9c0-20.3-12.3-34.1-30.7-34.1s-31 13.9-31 34.1 12.5 34.1 31 34.1 30.7-13.9 30.7-34.1ZM584.2 196.5c-40.5 0-70.2-25.1-70.2-68.6s32-68.3 71-68.3 65.9 25.9 65.9 64.3-.5 14.1-.5 14.1h-93.6c1.9 18.9 16.3 27.5 33.6 27.5s32-7.5 39.5-12.5l16.8 22.1c-4.3 3.2-21.6 21.3-62.4 21.3Zm0-109.1c-17.6 0-26.7 13.9-27.2 26.4h54.2c-.3-12-9.1-26.4-27-26.4ZM708 62.1l-.3 18.7h.5c7.5-14.4 18.4-21.1 32.5-21.1s13.3 2.4 13.3 2.4l-2.4 39.2h-1.9c-2.4-1.3-8-3.2-15.5-3.2s-16.5 5.3-19.7 9.6c-3.2 4.3-6.7 12.8-6.7 27.5v58.4h-42.7V62.1h42.7Z"></path></g></svg>
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
            <img src="https://farbergroups.com/image/flipkart-icon.png"
                 width="60" alt="Flipkart"
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

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;">

        <!-- Logo -->
        <tr>
          <td align="left" style="padding:40px 50px 30px;">
            <img src="https://farbergroups.com/image/blackberry.png"
                 width="80" alt="Logo" style="display:block;">
          </td>
        </tr>

        <!-- Content -->
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
