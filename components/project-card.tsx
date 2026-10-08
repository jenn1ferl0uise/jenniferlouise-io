import type { Project } from '@/content/site';

export default function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.id}`;

  return (
    <article className="cell project" aria-labelledby={headingId}>
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
