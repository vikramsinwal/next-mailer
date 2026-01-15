import { ContactFormData } from "@/lib/validators/contact.schema";

export const amazonTemplate = (data: ContactFormData) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
  <tr>
    <td align="center" style="padding:15px 0;">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td align="left" style="background:#f0f2f2;padding:15px;">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/256px-Amazon_logo.svg.png"
              width="60"
              height="60"
              alt="Amazon"
              style="display:block;border:0;"
            />
          </td>
        </tr>

        <!-- Body -->
        ${data.message}

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
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#292929;">
  <tr>
    <td align="center" style="padding:40px 0;">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td align="center" style="background:#f0f2f2;padding:40px;">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/256px-Amazon_logo.svg.png"
              width="60"
              height="60"
              alt="Farber Group"
              style="display:block;border:0;"
            />
          </td>
        </tr>

        <!-- Body -->
        ${data.message}

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

export const flipkartTemplate = (data: ContactFormData) => `
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">

      <!-- Header -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#027cd5;">
        <tr>
          <td align="left" style="padding:10px;">
            <img src="https://img6a.flixcart.com/www/promos/new/20150709-142534-flipkart.png"
                 height="30"
                 alt="Flipkart"
                 style="display:block;border:0;">
          </td>
          
        </tr>
      </table>

      
      <!-- Content -->
      <table width="600" cellpadding="0" cellspacing="0" style="border:1px solid #e6e6e6;">
        <tr>
          <td style="padding:25px;font-size:14px;color:#565656;line-height:20px;">
            ${data.message}
          </td>
        </tr>
      </table>

      <!-- Footer -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#f9f9f9;">
        <tr>
          <td align="center" style="padding:15px;font-size:11px;color:#565656;">
            <a href="https://www.flipkart.com"
               style="color:#565656;text-decoration:none;">
              Flipkart.com
            </a>
            <br><br>
            © 2007-2026 All right reserved. Flipkart Internet Private Limited.
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
`;
export const genericTemplate = (data: ContactFormData) => `
  <div style="font-family:Arial;padding:20px">
    <h2>${data.subject}</h2>
    <p>${data.message}</p>
  </div>
`;

export const blackBerryTemplate = (data: ContactFormData) => `
  <div style="font-family:Arial;padding:20px">
    <h2>${data.subject}</h2>
    <p>${data.message}</p>
  </div>
`;
