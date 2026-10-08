import type { Project } from '@/content/site';

interface ProjectCardProps {
  project: Project;
  /** Frosted-glass variant, used to alternate with solid cards. */
  glass?: boolean;
}

export default function ProjectCard({ project, glass = false }: ProjectCardProps) {
  const headingId = `project-${project.id}`;

  return (
    <article
      className={glass ? 'cell project glass' : 'cell project'}
      aria-labelledby={headingId}
      data-section={`project:${project.id}`}
    >
      <h3 id={headingId}>
        {project.title}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-track-label={project.title}
          aria-label={`Visit ${project.title} (opens in a new tab)`}
        >
          Visit ↗
        </a>
      </h3>
      <dl className="ff">
        <div className="friction">
          <dt>The friction</dt>
          <dd>{project.friction}</dd>
        </div>
        <div className="flow">
          <dt>The flow</dt>
          <dd>{project.flow}</dd>
        </div>
      </dl>
      {project.tags && project.tags.length > 0 && (
        <ul className="tags" aria-label="Built with">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
