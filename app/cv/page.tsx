"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { trackEvent } from "@/lib/analytics";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

interface Skill {
  category: string;
  items: string[];
}

const CV: React.FC = () => {
  useScrollTracking();
  const [expanded, setExpanded] = useState({
    skills: true,
    experience: true,
    education: false,
  });

  const summaryRef = useSectionTracking("summary");
  const skillsRef = useSectionTracking("skills");
  const experienceRef = useSectionTracking("experience");
  const educationRef = useSectionTracking("education");

  const handleProjectBtnClick = () => {
    trackEvent.projectsBtnClick();
  };

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const skills: Skill[] = [
    {
      category: "Frontend",
      items: [
        "React",
        "TypeScript",
        "Next.js",
        "Vite",
        "Tailwind CSS",
        "shadcn/ui",
        "Redux",
        "HTML5",
        "CSS3",
      ],
    },
    {
      category: "Architecture",
      items: [
        "Turborepo",
        "Monorepos",
        "Module Federation",
        "Microfrontends",
        "CI/CD",
      ],
    },
    {
      category: "Testing",
      items: [
        "Jest",
        "React Testing Library",
        "Cypress",
        "Vitest",
        "Performance Optimization",
      ],
    },
    {
      category: "Backend",
      items: [
        "PostgreSQL",
        "REST APIs",
        "Node.js",
        "Supabase",
        "Vercel",
        "Cloudflare R2",
        "S3",
      ],
    },
    {
      category: "Design Systems",
      items: [
        "Storybook",
        "Component Architecture",
        "Accessibility",
        "Responsive Design",
      ],
    },
    {
      category: "AI & Emerging Tech",
      items: ["Claude API", "OpenAI API"],
    },
    {
      category: "Collaboration",
      items: [
        "Technical RFCs",
        "Mentoring",
        "Workshops",
        "Agile",
        "Cross-functional Teams",
      ],
    },
    {
      category: "Languages",
      items: ["English (Native)", "Spanish (B2+)"],
    },
  ];

  const experience: Experience[] = [
    {
      title: "Senior Software Engineer",
      company: "Independent Projects",
      location: "Remote",
      period: "August 2025 - Present",
      description: [
        "Built 4 full-stack applications from scratch: travel planning app, property management platform, medical clinic system, and photography portfolio with custom CMS",
        "Designed PostgreSQL schemas, REST APIs with Next.js, and integrated cloud storage (Cloudflare R2/S3) for production-ready applications",
        "Wrote PRDs, iterated on UI/UX based on user feedback, and made end-to-end product decisions",
        "Implemented authentication, RBAC, real-time data sync, and healthcare data privacy compliance",
      ],
    },
    {
      title: "Senior Frontend Software Engineer",
      company: "Scopely (Playgami)",
      location: "Barcelona",
      period: "May 2022 - August 2025",
      description: [
        "Led frontend for internal A/B testing, segmentation, and user profiling platforms supporting multiple product teams",
        "Co-led migration from micro frontends to Turborepo monorepo (Vite, PNPM, shadcn, Tailwind), contributing to architecture decisions and driving implementation",
        "Introduced technical planning processes: RFC documentation, workload estimation, and structured sprint planning that improved delivery predictability",
        "Mentored engineers through pair programming and delivered workshops on React patterns, testing, and modern tooling",
        "Partnered with product, design, and backend to optimize data models—reducing client-side processing and improving performance",
      ],
    },
    {
      title: "Software Engineer & Consultant",
      company: "Thoughtworks",
      location: "Barcelona",
      period: "September 2021 - April 2022",
      description: [
        "Built customer-facing portal (React, Java) to reduce reliance on support reps and improve self-service UX",
        "Facilitated client meetings, delivered feedback, and maintained high code quality standards throughout iterative development",
      ],
    },
    {
      title: "Frontend Software Engineer & Tech Lead",
      company: "Marfeel",
      location: "Barcelona",
      period: "May 2019 - September 2021",
      description: [
        "Led technical discovery for new clients (complexity estimation, web scraping) and integrated external media/analytics/ad providers",
        "Contributed to Vanilla JS → React migration and promoted to Tech Lead of 5-person pod",
        "Delivered React and testing workshops for team upskilling",
      ],
    },
  ];

  return (
    <div className="relative w-full">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-[blob_7s_infinite]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-[blob_7s_infinite_2s]" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-[blob_7s_infinite_4s]" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        <header
          ref={summaryRef}
          className="animate-[fade-in_0.6s_ease-out_forwards]"
        >
          <Card className="bg-card/50 backdrop-blur-xl border-white/10 hover:bg-white/5 transition-colors">
            <CardContent className="p-8 sm:p-10 space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Jennifer Louise Lynch
              </h1>
              <h2 className="text-xl sm:text-2xl text-cyan-400 font-medium">
                Senior Frontend Software Engineer
              </h2>
              <p className="text-slate-300 leading-relaxed max-w-3xl">
                Senior Frontend Engineer with 6+ years of professional
                experience building React and TypeScript applications in
                fast-paced product teams. I thrive at the intersection of
                design, product, and engineering—writing clean, scalable code
                while solving real user problems. I recently expanded into
                full-stack development through independent projects, building
                everything from database schemas to AI-powered features.
                Passionate about modern architecture, mentoring teams, and
                shipping products people actually want to use.
                <Button variant="link">
                  <Link
                    onClick={handleProjectBtnClick}
                    target="_blank"
                    href="/#projects"
                  >
                    Check out my projects!
                    <ExternalLink className="ml-2 inline size-2" />
                  </Link>
                </Button>
              </p>
            </CardContent>
          </Card>
        </header>

        <section
          ref={skillsRef}
          className="animate-[slide-up_0.6s_ease-out_forwards] [animation-delay:0.1s]"
        >
          <Card className="bg-card/50 backdrop-blur-xl border-white/10 hover:bg-white/5 transition-colors">
            <CardHeader className="pb-0">
              <Button
                variant="ghost"
                onClick={() => toggleSection("skills")}
                className="w-full flex items-center justify-between p-6 h-auto hover:bg-transparent"
              >
                <h3 className="text-2xl font-bold text-white">Skills</h3>
                <svg
                  className={cn(
                    "w-6 h-6 text-slate-400 transition-transform duration-300",
                    expanded.skills && "rotate-180",
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </CardHeader>
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                expanded.skills ? "max-h-500 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <CardContent className="p-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skillGroup) => (
                    <Card
                      key={skillGroup.category}
                      className="bg-card/50 backdrop-blur-xl border-white/10"
                    >
                      <CardContent className="sm:p-6 space-y-3">
                        <h4 className="font-semibold text-cyan-400 text-sm uppercase tracking-wide">
                          {skillGroup.category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-white/5 text-slate-200 rounded-full text-sm font-medium border border-white/10 hover:bg-white/5 hover:border-cyan-400/50 transition-all duration-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        <section
          ref={experienceRef}
          className="animate-[slide-up_0.6s_ease-out_forwards] [animation-delay:0.2s]"
        >
          <Card className="bg-card/50 backdrop-blur-xl border-white/10 hover:bg-white/5 transition-colors">
            <CardHeader className="pb-0">
              <Button
                variant="ghost"
                onClick={() => toggleSection("experience")}
                className="w-full flex items-center justify-between p-6 h-auto hover:bg-transparent"
              >
                <h3 className="text-2xl font-bold text-white">Experience</h3>
                <svg
                  className={cn(
                    "w-6 h-6 text-slate-400 transition-transform duration-300",
                    expanded.experience && "rotate-180",
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </CardHeader>
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                expanded.experience
                  ? "max-h-1250 opacity-100"
                  : "max-h-0 opacity-0",
              )}
            >
              <CardContent className="p-6 pt-2">
                <div className="space-y-4">
                  {experience.map((job, index) => (
                    <Card
                      key={index}
                      className="bg-card/50 backdrop-blur-xl border-white/10 "
                    >
                      <CardContent className="pt-6! space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h4 className="text-xl font-bold text-white">
                              {job.title}
                            </h4>
                            <p className="text-lg text-cyan-400 font-medium">
                              {job.company}
                            </p>
                            <p className="text-sm text-slate-400">
                              {job.location}
                            </p>
                          </div>
                          <span className="text-sm text-white/80 font-medium whitespace-nowrap">
                            {job.period}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {job.description.map((item, i) => (
                            <li
                              key={i}
                              className="text-slate-300 leading-relaxed flex items-start gap-3"
                            >
                              <span className="text-cyan-400 mt-1.5 shrink-0">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        <section
          ref={educationRef}
          className="animate-[slide-up_0.6s_ease-out_forwards] [animation-delay:0.3s]"
        >
          <Card className="bg-card/50 backdrop-blur-xl border-white/10 hover:bg-white/5 transition-colors">
            <CardHeader className="pb-0">
              <Button
                variant="ghost"
                onClick={() => toggleSection("education")}
                className="w-full flex items-center justify-between p-6 h-auto hover:bg-transparent"
              >
                <h3 className="text-2xl font-bold text-white">Education</h3>
                <svg
                  className={cn(
                    "w-6 h-6 text-slate-400 transition-transform duration-300",
                    expanded.education && "rotate-180",
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </CardHeader>
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                expanded.education
                  ? "max-h-250 opacity-100"
                  : "max-h-0 opacity-0",
              )}
            >
              <CardContent className="p-6 pt-2">
                <div className="space-y-4">
                  <Card className="bg-card/50 backdrop-blur-xl border-white/10">
                    <CardContent className="pt-4! space-y-1">
                      <h4 className="text-lg font-bold text-white">
                        Full Stack Web Developer Bootcamp
                      </h4>
                      <p className="text-cyan-400 font-medium">
                        Le Wagon, Barcelona
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 backdrop-blur-xl border-white/10 ">
                    <CardContent className="pt-4! space-y-1">
                      <h4 className="text-lg font-bold text-white">
                        Bachelor of Arts in Psychology (Hons)
                      </h4>
                      <p className="text-cyan-400 font-medium">
                        University of the West of Scotland, Glasgow
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default CV;
