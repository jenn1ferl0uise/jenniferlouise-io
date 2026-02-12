"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export interface EmailFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  // Track when the form was rendered (bot detection - real users take time)
  const formLoadTime = useRef<number>(0);

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check - if this hidden field is filled, it's likely a bot
    const honeypot = formData.get("website");
    if (honeypot) {
      // Silently reject but pretend success to confuse bots
      toast("Message sent", {
        description: "Thanks for reaching out 🌞",
      });
      form.reset();
      return;
    }

    // Time-based check - humans take at least a few seconds to fill a form
    const timeElapsed = Date.now() - formLoadTime.current;
    if (timeElapsed < 3000) {
      // Less than 3 seconds = likely a bot
      toast("Message sent", {
        description: "Thanks for reaching out 🌞",
      });
      form.reset();
      return;
    }

    // Add timestamp to formData for server-side validation
    formData.append("_timestamp", formLoadTime.current.toString());
    const values: EmailFormValues = {
      name: (formData.get("name") ?? "") as string,
      email: (formData.get("email") ?? "") as string,
      message: (formData.get("message") ?? "") as string,
    };

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      toast("Error", {
        description: "Please fill in all fields",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      toast("Error", {
        description: "Please enter a valid email address",
      });
      return;
    }

    const messageLength = values.message.length;
    if (messageLength < 10) {
      toast("Minimum message length not met");
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    form.reset();

    if (res.ok) {
      toast("Message sent", {
        description: "Thanks for reaching out ☀️",
      });
    } else {
      toast("Something went wrong");
    }
  }

  return (
    <Card className="p-8 md:p-10 bg-card/50 backdrop-blur-xl border-border/50">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot field - hidden from real users, bots will fill it */}
        <div className="hidden" aria-hidden="true">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <Label htmlFor="name" className="hidden tracking-wider">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            className="mt-2 bg-background/50"
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
            className="mt-2 bg-background/50"
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
            className="mt-2 min-h-30 bg-background/50 resize-none"
            placeholder="Write your message here…"
            rows={5}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 tracking-wide bg-primary hover:bg-accent transition-colors font-medium"
        >
          Send
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;
