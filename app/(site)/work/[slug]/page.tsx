import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import QuoteCta from '@/components/quote-cta';
import { features } from '@/content/features';
import { WORK_KINDS, WORK_STATUS, getCaseStudy, work } from '@/content/work';
import SiteHeader from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';
import { estimateDays, formatRange, quoteHref } from '@/lib/quote';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: study.title,
    description: `${study.friction} ${study.flow}`,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const nextStudy = work[(work.indexOf(study) + 1) % work.length];
  const isProposal = study.status === 'proposal';

  return (
    <main id="main" className="page case">
      <SiteHeader />

      <header className="cell case-head col-4" data-section={`case:${slug}`}>
        <span className="lbl">
          (work) {WORK_KINDS[study.kind]} · {WORK_STATUS[study.status].toLowerCase()}
        </span>
        <h1>{study.title}</h1>
        <p className="lead">{study.flow}</p>
        <div className="actions">
          <Link className="btn primary" href={quoteHref(slug)}>
            Get a quote for something like this
          </Link>
          {study.liveUrl && (
            <a
              className="btn"
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-label={`Case study: ${study.title} live site`}
            >
              Visit the live site <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </header>

      <aside className="cell case-meta col-2" aria-label="Project details">
        <dl>
          <div>
            <dt className="lbl">role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt className="lbl">status</dt>
            <dd>{WORK_STATUS[study.status]}</dd>
          </div>
          <div>
            <dt className="lbl">stack</dt>
            <dd>
              <ul className="tags">
                {study.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </aside>

      <section className="cell case-section col-3" aria-labelledby="problem-h">
        <span className="lbl">the friction</span>
        <h2 id="problem-h">The problem</h2>
        {study.problem.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="cell case-section col-3" aria-labelledby="features-h">
        <span className="lbl">the flow</span>
        <h2 id="features-h">{isProposal ? 'What it would do' : 'What it does'}</h2>
        <ul className="feature-list">
          {study.features.map((id) => (
            <li key={id}>
              <strong>{features[id].label}</strong>
              <span>{features[id].description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="cell case-section decisions col-6" aria-labelledby="decisions-h">
        <span className="lbl">the thinking</span>
        <h2 id="decisions-h">Decisions along the way</h2>
        <ol>
          {study.decisions.map((decision) => (
            <li key={decision.thought}>
              <p>
                <span className="lbl">i thought about</span>
                {decision.thought}
              </p>
              <p>
                <span className="lbl">so i {isProposal ? 'planned' : 'built'}</span>
                {decision.implemented}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {study.phases && (
        <section className="cell case-section phases col-6" aria-labelledby="phases-h">
          <span className="lbl">the estimate</span>
          <h2 id="phases-h">{isProposal ? 'How I’d split the work' : 'How the work was split'}</h2>
          <ol>
            {study.phases.map((phase, i) => (
              <li key={phase.name}>
                <span className="lbl">phase {i + 1}</span>
                <h3>{phase.name}</h3>
                {phase.note && <p>{phase.note}</p>}
                <ul className="tags">
                  {phase.features.map((id) => (
                    <li key={id}>{features[id].label}</li>
                  ))}
                </ul>
                <p className="effort">~{formatRange(estimateDays(phase.features), 'day')}</p>
              </li>
            ))}
          </ol>
          <p className="fine">
            An example breakdown: effort is in working days, before design and launch.
          </p>
        </section>
      )}

      {study.next.length > 0 && (
        <section className="cell case-section col-3" aria-labelledby="next-h">
          <span className="lbl">what&apos;s next</span>
          <h2 id="next-h">What I&apos;d do next</h2>
          <ul className="next-list">
            {study.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <QuoteCta
        preset={{ slug, title: study.title }}
        className={study.next.length > 0 ? 'col-3' : 'col-6'}
      />

      <nav className="cell pager col-6" aria-label="More work">
        <Link href="/#work">
          <span aria-hidden="true">←</span> All work
        </Link>
        {nextStudy !== study && (
          <Link href={`/work/${nextStudy.slug}`}>
            Next: {nextStudy.title} <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
