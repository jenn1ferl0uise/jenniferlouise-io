'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';

export interface EmailFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  useScrollTracking();

  const formLoadTime = useRef<number>(0);

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent.contactFormClick();

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

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      trackEvent.contactFormError('incomplete');

      toast('Error', {
        description: 'Please fill in all fields',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      trackEvent.contactFormError('email');

      toast('Error', {
        description: 'Please enter a valid email address',
      });
      return;
    }

    const messageLength = values.message.length;
    if (messageLength < 10) {
      trackEvent.contactFormError('message');

      toast('Minimum message length not met');
      return;
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });
    form.reset();

    if (res.ok) {
      toast('Message sent', {
        description: 'Thanks for reaching out ☀️',
      });
    } else {
      trackEvent.contactFormError('failed');

      toast('Something went wrong');
    }
  }

  return (
    <Card className="bg-card/50 border-border/30 p-4 backdrop-blur-xl md:p-4">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot field - hidden from real users, bots will fill it */}
        <div className="hidden" aria-hidden="true">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <Label htmlFor="name" className="hidden tracking-wider">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            className="bg-background/50 mt-2"
            placeholder="Name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="hidden tracking-wider">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            className="bg-background/50 mt-2"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <Label htmlFor="message" className="hidden tracking-wider">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            className="bg-background/50 mt-2 min-h-30 resize-none"
            placeholder="Write your message here…"
            rows={5}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Send
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;
