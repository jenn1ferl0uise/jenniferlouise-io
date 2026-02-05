"use client";

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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
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

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast("Message sent", {
        description: "Thanks for reaching out 🌞",
      });
      e.currentTarget.reset();
    } else {
      toast("Something went wrong");
    }
  }

  return (
    <Card className="p-8 md:p-10 bg-card/50 backdrop-blur-xl border-border/50">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
