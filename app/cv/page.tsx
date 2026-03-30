'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

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

  const summaryRef = useSectionTracking('summary');
  const skillsRef = useSectionTracking('skills');
  const experienceRef = useSectionTracking('experience');
  const educationRef = useSectionTracking('education');

  const handleProjectBtnClick = () => {
    trackEvent.projectsBtnClick();
  };

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const skills: Skill[] = [
    {
      category: 'Frontend',
      items: [
        'React',
        'TypeScript',
        'Next.js',
        'Vite',
        'Tailwind CSS',
        'shadcn/ui',
        'Redux',
        'HTML5',
        'CSS3',
      ],
    },
    {
      category: 'Architecture',
      items: ['Turborepo', 'Monorepos', 'Module Federation', 'Microfrontends', 'CI/CD'],
    },
    {
      category: 'Testing',
      items: ['Jest', 'React Testing Library', 'Cypress', 'Vitest', 'Performance Optimization'],
    },
    {
      category: 'Backend',
      items: ['PostgreSQL', 'REST APIs', 'Node.js', 'Supabase', 'Vercel', 'Cloudflare R2', 'S3'],
    },
    {
      category: 'Design Systems',
      items: ['Storybook', 'Component Architecture', 'Accessibility', 'Responsive Design'],
    },
    {
      category: 'AI & Emerging Tech',
      items: ['Claude API', 'OpenAI API'],
    },
    {
      category: 'Collaboration',
      items: ['Technical RFCs', 'Mentoring', 'Workshops', 'Agile', 'Cross-functional Teams'],
    },
    {
      category: 'Languages',
      items: ['English (Native)', 'Spanish (B2+)'],
    },
  ];

  const experience: Experience[] = [
    {
      title: 'Senior Software Engineer',
      company: 'Independent Projects',
      location: 'Remote',
      period: 'August 2025 - Present',
      description: [
        'Built 4 full-stack applications from scratch: travel planning app, property management platform, medical clinic system, and photography portfolio with custom CMS',
        'Designed PostgreSQL schemas, REST APIs with Next.js, and integrated cloud storage (Cloudflare R2/S3) for production-ready applications',
        'Wrote PRDs, iterated on UI/UX based on user feedback, and made end-to-end product decisions',
        'Implemented authentication, RBAC, real-time data sync, and healthcare data privacy compliance',
      ],
    },
    {
      title: 'Senior Frontend Software Engineer',
      company: 'Scopely (Playgami)',
      location: 'Barcelona',
      period: 'May 2022 - August 2025',
      description: [
        'Led frontend for internal A/B testing, segmentation, and user profiling platforms supporting multiple product teams',
        'Co-led migration from micro frontends to Turborepo monorepo (Vite, PNPM, shadcn, Tailwind), contributing to architecture decisions and driving implementation',
        'Introduced technical planning processes: RFC documentation, workload estimation, and structured sprint planning that improved delivery predictability',
        'Mentored engineers through pair programming and delivered workshops on React patterns, testing, and modern tooling',
        'Partnered with product, design, and backend to optimize data models—reducing client-side processing and improving performance',
      ],
    },
    {
      title: 'Software Engineer & Consultant',
      company: 'Thoughtworks',
      location: 'Barcelona',
      period: 'September 2021 - April 2022',
      description: [
        'Built customer-facing portal (React, Java) to reduce reliance on support reps and improve self-service UX',
        'Facilitated client meetings, delivered feedback, and maintained high code quality standards throughout iterative development',
      ],
    },
    {
      title: 'Frontend Software Engineer & Tech Lead',
      company: 'Marfeel',
      location: 'Barcelona',
      period: 'May 2019 - September 2021',
      description: [
        'Led technical discovery for new clients (complexity estimation, web scraping) and integrated external media/analytics/ad providers',
        'Contributed to Vanilla JS → React migration and promoted to Tech Lead of 5-person pod',
        'Delivered React and testing workshops for team upskilling',
      ],
    },
  ];

  return (
    <div className="relative w-full">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 animate-[blob_7s_infinite] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 animate-[blob_7s_infinite_2s] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-96 w-96 animate-[blob_7s_infinite_4s] rounded-full bg-pink-500/20 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
        <header ref={summaryRef} className="animate-[fade-in_0.6s_ease-out_forwards]">
          <Card className="bg-card/50 border-white/10 backdrop-blur-xl transition-colors hover:bg-white/5">
            <CardContent className="space-y-4 p-8 sm:p-10">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Jennifer Louise Lynch
              </h1>
              <h2 className="text-xl font-medium text-cyan-400 sm:text-2xl">
                Senior Frontend Software Engineer
              </h2>
              <p className="max-w-3xl leading-relaxed text-slate-300">
                Senior Frontend Engineer with 6+ years of professional experience building React and
                TypeScript applications in fast-paced product teams. I thrive at the intersection of
                design, product, and engineering—writing clean, scalable code while solving real
                user problems. I recently expanded into full-stack development through independent
                projects, building everything from database schemas to AI-powered features.
                Passionate about modern architecture, mentoring teams, and shipping products people
                actually want to use.
                <Button className="px-2" variant="link">
                  <Link onClick={handleProjectBtnClick} target="_blank" href="/#projects">
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
          <Card className="bg-card/50 border-white/10 backdrop-blur-xl transition-colors hover:bg-white/5">
            <CardHeader>
              <Button
                variant="ghost"
                onClick={() => toggleSection('skills')}
                className="flex h-auto w-full items-center justify-between p-6 hover:bg-transparent"
              >
                <h3 className="text-2xl font-bold text-white">Skills</h3>
                <svg
                  className={cn(
                    'h-6 w-6 text-slate-400 transition-transform duration-300',
                    expanded.skills && 'rotate-180'
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
                'overflow-hidden transition-all duration-500 ease-in-out',
                expanded.skills ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <CardContent className="p-6 pt-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {skills.map((skillGroup) => (
                    <Card
                      key={skillGroup.category}
                      className="bg-card/50 border-white/10 backdrop-blur-xl"
                    >
                      <CardContent className="space-y-3 p-4 sm:p-6">
                        <h4 className="text-sm font-semibold tracking-wide text-cyan-400 uppercase">
                          {skillGroup.category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-cyan-400/50 hover:bg-white/5"
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
          <Card className="bg-card/50 border-white/10 backdrop-blur-xl transition-colors hover:bg-white/5">
            <CardHeader>
              <Button
                variant="ghost"
                onClick={() => toggleSection('experience')}
                className="flex h-auto w-full items-center justify-between p-6 hover:bg-transparent"
              >
                <h3 className="text-2xl font-bold text-white">Experience</h3>
                <svg
                  className={cn(
                    'h-6 w-6 text-slate-400 transition-transform duration-300',
                    expanded.experience && 'rotate-180'
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
                'overflow-hidden transition-all duration-500 ease-in-out',
                expanded.experience ? 'max-h-1250 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <CardContent className="p-6 pt-2">
                <div className="space-y-4">
                  {experience.map((job, index) => (
                    <Card key={index} className="bg-card/50 border-white/10 backdrop-blur-xl">
                      <CardContent className="space-y-4 pt-6!">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h4 className="text-xl font-bold text-white">{job.title}</h4>
                            <p className="text-lg font-medium text-cyan-400">{job.company}</p>
                            <p className="text-sm text-slate-400">{job.location}</p>
                          </div>
                          <span className="text-sm font-medium whitespace-nowrap text-white/80">
                            {job.period}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {job.description.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 leading-relaxed text-slate-300"
                            >
                              <span className="mt-1.5 shrink-0 text-cyan-400">•</span>
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
          <Card className="bg-card/50 border-white/10 backdrop-blur-xl transition-colors hover:bg-white/5">
            <CardHeader>
              <Button
                variant="ghost"
                onClick={() => toggleSection('education')}
                className="flex h-auto w-full items-center justify-between p-6 hover:bg-transparent"
              >
                <h3 className="text-2xl font-bold text-white">Education</h3>
                <svg
                  className={cn(
                    'h-6 w-6 text-slate-400 transition-transform duration-300',
                    expanded.education && 'rotate-180'
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
                'overflow-hidden transition-all duration-500 ease-in-out',
                expanded.education ? 'max-h-250 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <CardContent className="p-6 pt-2">
                <div className="space-y-4">
                  <Card className="bg-card/50 border-white/10 backdrop-blur-xl">
                    <CardContent className="space-y-1 pt-4!">
                      <h4 className="text-lg font-bold text-white">
                        Full Stack Web Developer Bootcamp
                      </h4>
                      <p className="font-medium text-cyan-400">Le Wagon, Barcelona</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 border-white/10 backdrop-blur-xl">
                    <CardContent className="space-y-1 pt-4!">
                      <h4 className="text-lg font-bold text-white">
                        Bachelor of Arts in Psychology (Hons)
                      </h4>
                      <p className="font-medium text-cyan-400">
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
