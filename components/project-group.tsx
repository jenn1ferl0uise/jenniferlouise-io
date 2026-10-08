import type { ReactNode } from 'react';
import ProjectCard from '@/components/project-card';
import type { CaseStudy } from '@/content/work';

interface ProjectGroupProps {
  id: string;
  label: string;
  title: ReactNode;
  intro: string;
  projects: CaseStudy[];
  /** Extra cards rendered after the projects (e.g. a call to action). */
  children?: ReactNode;
  className?: string;
}

/** A frosted panel that groups related project cards under one title. */
export default function ProjectGroup({
  id,
  label,
  title,
  intro,
  projects,
  children,
  className,
}: ProjectGroupProps) {
  const headingId = `${id}-h`;

  return (
    <section
      id={id}
      className={className ? `group ${className}` : 'group'}
      data-section={id}
      aria-labelledby={headingId}
    >
      <header className="group-head">
        <div>
          <span className="lbl">{label}</span>
          <h2 id={headingId}>{title}</h2>
        </div>
        <p>{intro}</p>
      </header>
      <div className="group-grid">
        {projects.map((study) => (
          <ProjectCard key={study.slug} study={study} />
        ))}
        {children}
      </div>
    </section>
  );
}
