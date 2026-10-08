import Link from 'next/link';
import { WORK_STATUS, type CaseStudy } from '@/content/work';

export default function ProjectCard({ study }: { study: CaseStudy }) {
  const headingId = `project-${study.slug}`;

  return (
    <article
      className="cell project"
      aria-labelledby={headingId}
      data-section={`project:${study.slug}`}
    >
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
