import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/contact-form';
import ProjectGroup from '@/components/project-group';
import { Cat, Volcano } from '@/components/animals';
import { links, principles, site } from '@/content/site';
import { getWorkByKind, recentWork } from '@/content/work';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({ path: '/' });

export default function Home() {
  return (
    <main id="main" className="page home">
      <section className="cell hero" id="top" data-section="hero" aria-labelledby="hero-h">
        <span className="lbl">(a) hello</span>
        <h1 id="hero-h">{site.name}</h1>
        <p className="tagline">
          Product engineer
          <span className="tagline-rest">
            turning <em>friction into flow.</em>
          </span>
        </p>
        <p>
          Almost a decade turning ideas into products people actually use, from the first sketch to
          the final release. AI is part of how I work now, so I can try more ideas and ship the good
          ones sooner.
        </p>
        <dl className="career">
          <dt className="lbl">currently</dt>
          <dd>{site.currently}</dd>
          <dt className="lbl">previously</dt>
          <dd>{site.previously.join(' · ')}</dd>
        </dl>
        <div className="actions">
          <a className="btn primary" href="#work">
            Explore my projects
          </a>
          <a className="btn" href="#hello">
            Say hello
          </a>
        </div>
      </section>

      <section className="cell recent glass" data-section="recent" aria-labelledby="recent-h">
        <h2 id="recent-h" className="lbl">
          recent projects
        </h2>
        <ul>
          {recentWork.map((study) => (
            <li key={study.slug}>
              <Link href={`/work/${study.slug}`} data-track-label={`Recent: ${study.title}`}>
                <strong>
                  {study.title} <span aria-hidden="true">→</span>
                </strong>
                <span>{study.flow}</span>
              </Link>
            </li>
          ))}
        </ul>
        <a href="#work" className="recent-all">
          All projects <span aria-hidden="true">↓</span>
        </a>
      </section>

      <ProjectGroup
        id="work"
        className="group-products"
        label="(b) my products"
        title={
          <>
            Things I&apos;ve <em>built</em>
          </>
        }
        intro="Designed and built by me, from first idea to production."
        projects={getWorkByKind('own')}
      />

      <ProjectGroup
        id="clients"
        className="group-clients"
        label="(c) client work"
        title={
          <>
            Built <em>for others</em>
          </>
        }
        intro="Websites and apps shaped around what a business needs."
        projects={getWorkByKind('client')}
      >
        <article className="cell cta" aria-labelledby="cta-h">
          <span className="lbl">your project?</span>
          <h3 id="cta-h">This space is free</h3>
          <p>
            Have an idea that needs a website or an app? Pick the features it needs and get a rough
            timeline.
          </p>
          <Link className="btn primary" href="/quote">
            Build a quote <span aria-hidden="true">→</span>
          </Link>
        </article>
      </ProjectGroup>

      <section className="cell how glass" data-section="how" aria-labelledby="how-h">
        <span className="lbl">(d) how i work</span>
        <h2 id="how-h">Careful by default</h2>
        <ul>
          {principles.map((p) => (
            <li key={p.title}>
              <strong>{p.title}</strong>
              <span>{p.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="cell hello" id="hello" data-section="contact" aria-labelledby="hello-h">
        <Cat />
        <Volcano />
        <span className="lbl">(e) say hello</span>
        <h2 id="hello-h">
          Have a role or a project <em>in mind?</em>
        </h2>
        <p>
          I&apos;m always happy to talk about products, UX, the systems behind them, or a website
          you&apos;d like to exist. You can also find me on{' '}
          <a
            href={links.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            data-track-label="Contact: LinkedIn"
          >
            LinkedIn
          </a>
          .
        </p>
        <ContactForm />
      </section>
    </main>
  );
}
