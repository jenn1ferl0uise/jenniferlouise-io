import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Property Manager",
    description:
      "A comprehensive property management platform designed to streamline rental property operations and bookingsg.",
    url: "https://property-mananger.jenniferlouise.io/",
  },
  {
    title: "Clinic Manager",
    description:
      "A modern clinic management app for patient records, appointment scheduling, and pateitn history.",
    url: "https://clinic-mananger.jenniferlouise.io/en",
  },
  {
    title: "Photography Portfolio",
    description:
      "A showcase of my photography work, featuring curated collections and client galleries.",
    url: "https://photos.jenniferlouise.io",
  },
];

function getPreviewUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

export default function Home() {
  return (
    <>
      <section className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Jennifer Louise
        </h1>
      </section>

      <section className="m-auto max-w-4xl mt-12 px-6">
        <h2 className="text-xl font-bold text-center mb-8">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-105"
            >
              <div className="relative w-full" style={{ height: "45%" }}>
                <Image
                  src={getPreviewUrl(project.url)}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover"
                  unoptimized
                  style={{
                    objectFit: "cover",
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit",
                  }}
                />
              </div>
              <CardHeader className="pt-4 pb-2">
                <CardTitle className="text-lg min-h-8 flex items-center justify-center text-center mb-2 sm:mb-0">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center min-h-12">
                <CardDescription className="text-base text-center w-full mb-6 sm:mb-0 px-2 sm:px-0 min-h-20 sm:min-h-12 flex items-center justify-center">
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto pb-4 pt-2 sm:pt-0">
                <Button asChild className="w-full">
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="m-auto max-w-2xl mt-12 text-center px-6">
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        <ContactForm />
      </section>
    </>
  );
}
