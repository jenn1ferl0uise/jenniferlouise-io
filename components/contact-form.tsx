'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { trackEvent, type FormSource } from '@/lib/analytics';
import { validateContact, type EmailFormValues } from '@/lib/contact-validation';

interface ContactFormProps {
  /** Which form this is, for analytics. */
  source?: FormSource;
  /** Extra fields sent with the message, rendered before the message box. */
  children?: ReactNode;
  messageLabel?: string;
  submitLabel?: string;
}

const ContactForm = ({
  source = 'hello',
  children,
  messageLabel = 'Message',
  submitLabel = 'Send message',
}: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formLoadTime = useRef<number>(0);

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    trackEvent.contactFormClick(source);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check - if this hidden field is filled, it's likely a bot
    const honeypot = formData.get('website');
    if (honeypot) {
      // Silently reject but pretend success to confuse bots
      toast('Message sent', {
        description: 'Thanks for reaching out 🌞',
      });
      form.reset();
      return;
    }

    // Time-based check - humans take at least a few seconds to fill a form
    const timeElapsed = Date.now() - formLoadTime.current;
    if (timeElapsed < 3000) {
      // Less than 3 seconds = likely a bot
      toast('Message sent', {
        description: 'Thanks for reaching out 🌞',
      });
      form.reset();
      return;
    }

    // Add timestamp to formData for server-side validation
    formData.append('_timestamp', formLoadTime.current.toString());
    const values: EmailFormValues = {
      name: (formData.get('name') ?? '') as string,
      email: (formData.get('email') ?? '') as string,
      message: (formData.get('message') ?? '') as string,
    };

    const validation = validateContact(values);
    if (!validation.ok) {
      trackEvent.contactFormError(validation.error, source);

      if (validation.error === 'incomplete') {
        toast('Please fill in your name, email and message.');
      } else if (validation.error === 'email') {
        toast('That email address doesn’t look right. Please check it.');
      } else {
        toast('Please write a little more, at least 10 characters.');
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        form.reset();
        trackEvent.contactFormSubmit(source);
        toast('Message sent', {
          description: 'Thanks for reaching out ☀️',
        });
      } else {
        trackEvent.contactFormError('failed', source);
        toast('Your message didn’t send. Please try again in a moment.');
      }
    } catch {
      trackEvent.contactFormError('failed', source);
      toast('Your message didn’t send. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      {/* Honeypot field - hidden from real users, bots will fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      {children}

      <div className="field field-wide">
        <label htmlFor="message">{messageLabel}</label>
        <textarea id="message" name="message" rows={4} required />
      </div>

      <button type="submit" className="btn primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
};

export default ContactForm;
