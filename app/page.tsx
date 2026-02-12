import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Jennifer Louise
        </h1>

        <p className="mt-4 text-muted text-sm md:text-lg font-soft">
          Contact me for any enquiries
        </p>
      </section>
      <section className="m-auto max-w-2xl mt-4 text-center px-6">
        <ContactForm />
      </section>
      <section className="text-center px-6">
        <div className="mt-8">
          <Button variant="outline" asChild>
            <Link href="https://photos.jenniferlouise.io">
              Check out my photography
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
