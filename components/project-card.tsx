import Link from 'next/link';
import ProjectPreview from '@/components/project-preview';
import { getPreview, previewStyle } from '@/content/previews';
import { WORK_STATUS, type CaseStudy } from '@/content/work';

interface ProjectCardProps {
  study: CaseStudy;
  /** Frosted-glass variant, used to alternate with solid cards. */
  glass?: boolean;
}

export default function ProjectCard({ study, glass = false }: ProjectCardProps) {
  const headingId = `project-${study.slug}`;
  const preview = getPreview(study.slug);
  const className = [
    'cell project',
    glass && 'glass',
    preview && `has-preview preview-${previewStyle}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={className}
      aria-labelledby={headingId}
      data-section={`project:${study.slug}`}
    >
      {preview && <ProjectPreview media={preview} />}
      <h3 id={headingId}>
        <Link href={`/work/${study.slug}`}>{study.title}</Link>
        {study.status !== 'live' && <span className="status">{WORK_STATUS[study.status]}</span>}
      </h3>
      <dl className="ff">
        <div className="friction">
          <dt>The friction</dt>
          <dd>{study.friction}</dd>
        </div>
        <div className="flow">
          <dt>The flow</dt>
          <dd>{study.flow}</dd>
        </div>
      </dl>
      <span className="more" aria-hidden="true">
        How I built it →
      </span>
    </article>
  );
}
