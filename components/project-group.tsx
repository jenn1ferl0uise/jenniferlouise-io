import type { ReactNode } from 'react';
import ProjectCard from '@/components/project-card';
import type { Project } from '@/content/site';

interface ProjectGroupProps {
  id: string;
  label: string;
  title: ReactNode;
  intro: string;
  projects: Project[];
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
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {children}
      </div>
    </section>
  );
}
