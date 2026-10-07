export interface EmailFormValues {
  name: string;
  email: string;
  message: string;
}

export const MIN_MESSAGE_LENGTH = 10;
export const MAX_LENGTH = 5000;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactValidationResult =
  | { ok: true }
  | { ok: false; error: 'incomplete' | 'email' | 'message' };

export function validateContact(values: EmailFormValues): ContactValidationResult {
  if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
    return { ok: false, error: 'incomplete' };
  }
  if (!EMAIL_REGEX.test(values.email.trim())) {
    return { ok: false, error: 'email' };
  }
  if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    return { ok: false, error: 'message' };
  }
  return { ok: true };
}
