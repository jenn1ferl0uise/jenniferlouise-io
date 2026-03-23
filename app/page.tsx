'use client';
import ContactForm from '@/components/contact-form.tsx';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { trackEvent } from '@/lib/analytics';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'Property Manager',
    description:
      'A comprehensive property management platform designed to streamline rental property operations and bookings.',
    url: 'https://property-mananger.jenniferlouise.io/',
  },
  {
    title: 'Clinic Manager',
    description:
      'A modern clinic management app for patient records, appointment scheduling, and patient history.',
    url: 'https://clinic-mananger.jenniferlouise.io/en',
  },
  {
    title: 'Photography Portfolio',
    description:
      'A showcase of my photography, in a custom built web app with admin panel to manage uploads and updates.',
    url: 'https://photos.jenniferlouise.io',
  },
  {
    title: 'Travel Organizer App',
    description:
      'Building a solution to my own problems in organizing trips, alone or with others. A place to keep details, visualize paths while tracking costs.',
    url: 'https://navizo.jenniferlouise.io',
  },
];

export default function Home() {
  useScrollTracking();
  const heroRef = useSectionTracking('hero');
  const projectsRef = useSectionTracking('projects');
  const aboutRef = useSectionTracking('about');
  const contactRef = useSectionTracking('contact');

  const handleExternalLinkClick = (url: string, label: string) => {
    const timestamp = new Date().toISOString();
    trackEvent.externalLinkClick(url, label, timestamp);
  };

  return (
    <>
      <section className="px-6 text-center" ref={heroRef}>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">Jennifer Louise</h1>
        <Card className="bg-card/20 m-auto mt-12 max-w-xl backdrop-blur-xl">
          <CardContent className="pt-4!">
            Senior software engineer, people person, travel enthusiast, amature photograph taker &
            much more...
          </CardContent>
        </Card>
        <Button className="mt-6" asChild>
          <Link href="/cv">Check out my CV!</Link>
        </Button>
      </section>

      <section id="projects" ref={projectsRef} className="m-auto mt-12 max-w-4xl px-6">
        <h2 className="mb-8 text-center text-xl font-bold">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="bg-card/20 flex h-60 flex-col overflow-hidden backdrop-blur-xl transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pt-4 pb-2">
                <CardTitle className="mb-2 flex min-h-8 items-center justify-center text-center text-lg sm:mb-0">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex min-h-12 flex-1 items-center justify-center">
                <CardDescription className="mb-6 flex min-h-20 w-full items-center justify-center px-2 text-center text-base sm:mb-0 sm:min-h-12 sm:px-0">
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto pt-2 pb-4 sm:pt-0">
                <Button asChild className="w-full">
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleExternalLinkClick(project.url, project.title)}
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

      <section ref={aboutRef} className="m-auto mt-12 max-w-2xl px-6 text-center">
        <h2 className="mb-4 text-xl font-bold">About me</h2>
        <Card className="bg-card/20 m-auto mt-12 max-w-xl backdrop-blur-xl">
          <CardContent className="pt-4!">
            I&apos;m a Senior Frontend Engineer with 6+ years building React and TypeScript
            applications within technical and cross dicipline teams.
            <br />I care deeply about creating simple, intuitive interfaces that solve real
            problems.. not only for looking good. <br />
            These days, I&apos;m expanding beyond the frontend. I build full-stack applications from
            database schema to deploy button, which has given me a much better understanding of how
            data flows through a product and how architectural decisions impact the entire user
            experience.
          </CardContent>
        </Card>
      </section>

      <section ref={contactRef} id="contact" className="m-auto mt-12 max-w-2xl px-6 text-center">
        <h2 className="mb-4 text-xl font-bold">Contact</h2>
        <ContactForm />
      </section>
    </>
  );
}
