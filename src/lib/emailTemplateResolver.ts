import {
  amazonTemplate,
  farberTemplate,
  flipkartTemplate,
  genericTemplate,
  blackBerryTemplate,
} from "@/lib/emailTemplate";

import { ContactFormData } from "@/lib/validators/contact.schema";

const TEMPLATE_MAP: Record<
  ContactFormData["templateKey"],
  (data: ContactFormData) => string
> = {
  amazon: amazonTemplate,
  farber: farberTemplate,
  flipkart: flipkartTemplate,
  generic: genericTemplate,
  blackberry: blackBerryTemplate,
};

export function getEmailTemplate(data: ContactFormData) {
  const templateFn = TEMPLATE_MAP[data.templateKey];

  if (!templateFn) {
    throw new Error(`Invalid template key: ${data.templateKey}`);
  }

  return templateFn(data);
}
