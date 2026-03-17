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
import Link from "next/link";

const projects = [
  {
    title: "Property Manager",
    description:
      "A comprehensive property management platform designed to streamline rental property operations and bookings.",
    url: "https://property-mananger.jenniferlouise.io/",
  },
  {
    title: "Clinic Manager",
    description:
      "A modern clinic management app for patient records, appointment scheduling, and patient history.",
    url: "https://clinic-mananger.jenniferlouise.io/en",
  },
  {
    title: "Photography Portfolio",
    description:
      "A showcase of my photography, in a custom built web app with admin panel to manage uploads and updates.",
    url: "https://photos.jenniferlouise.io",
  },
  {
    title: "Travel Organizer App",
    description:
      "Building a solution to my own problems in organizing trips, alone or with others. A place to keep details, visualize paths while tracking costs.",
    url: "https://navizo.jenniferlouise.io",
  },
];

export default function Home() {
  return (
    <>
      <section className="text-center px-6 ">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Jennifer Louise
        </h1>
        <Card className="m-auto max-w-xl mt-12 bg-card/20 backdrop-blur-xl">
          <CardContent className="pt-4!">
            Senior software engineer, people person, travel enthusiast, amature
            photograph taker & much more...
          </CardContent>
        </Card>
        <Button className="mt-4" asChild variant="outline">
          <a href="/jennifer-louise-lynch-cv.pdf" download="Jennifer_Lynch_CV">
            Check out my CV
          </a>
        </Button>
      </section>

      <section className="m-auto max-w-4xl mt-12 px-6">
        <h2 className="text-xl font-bold text-center mb-8">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-60 bg-card/20 backdrop-blur-xl"
            >
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
        <h2 className="text-xl font-bold mb-4">About me</h2>
        <Card className="m-auto max-w-xl mt-12 bg-card/20 backdrop-blur-xl">
          <CardContent className="pt-4!">
            I&apos;m a Senior Frontend Engineer with 6+ years building React and
            TypeScript applications within technical and cross dicipline teams.
            <br />I care deeply about creating simple, intuitive interfaces that
            solve real problems.. not only for looking good. <br />
            These days, I&apos;m expanding beyond the frontend. I build
            full-stack applications from database schema to deploy button, which
            has given me a much better understanding of how data flows through a
            product and how architectural decisions impact the entire user
            experience.
          </CardContent>
        </Card>
      </section>

      <section className="m-auto max-w-2xl mt-12 text-center px-6">
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        <ContactForm />
      </section>
    </>
  );
}
