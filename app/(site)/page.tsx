import type { Metadata } from 'next';
import ContactForm from '@/components/contact-form';
import ProjectCard from '@/components/project-card';
import QuoteCta from '@/components/quote-cta';
import { Cat, Fish } from '@/components/animals';
import { links, principles, site } from '@/content/site';
import { getWorkByKind } from '@/content/work';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({ path: '/' });

const photoPlaceholders = ['from above', 'water', 'through', 'lines'];

export default function Home() {
  return (
    <main id="main" className="page home">
      <div className="open sky0" aria-hidden="true" />

      <section className="cell hero" id="top" data-section="hero" aria-labelledby="hero-h">
        <span className="lbl">(a) hello</span>
        <h1 id="hero-h">
          <span className="sr-only">{site.fullName}, </span>
          Frontend engineer turning <em>friction into flow.</em>
        </h1>
        <p>
          Seven years building React and TypeScript products. I like the small details that make
          software feel calm, and I photograph the world from above when I&apos;m not at a keyboard.
        </p>
        <p className="previously">
          <span className="lbl">previously</span> {site.previously.join(' · ')}
        </p>
        <div className="actions">
          <a className="btn primary" href="#work">
            See the work
          </a>
          <a className="btn" href="#hello">
            Say hello
          </a>
        </div>
      </section>

      <div className="cell pics" aria-hidden="true">
        <span className="pol p1">
          <i />
        </span>
        <span className="pol p2">
          <i />
        </span>
        <span className="pol p3">
          <i />
        </span>
        <span className="cap">from my camera roll</span>
      </div>

      <section className="work-group work-own" id="work" aria-labelledby="work-own-h">
        <div className="open group-head">
          <h2 id="work-own-h" className="sky-chip">
            <span className="lbl">(b) my products</span>
            Things I&apos;ve <em>built</em>
          </h2>
        </div>
        {getWorkByKind('own').map((study) => (
          <ProjectCard key={study.slug} study={study} />
        ))}
      </section>

      <section className="work-group work-client" id="for-others" aria-labelledby="work-client-h">
        <div className="open group-head">
          <h2 id="work-client-h" className="sky-chip">
            <span className="lbl">(c) for others</span>
            Work for <em>others</em>
          </h2>
        </div>
        {getWorkByKind('client').map((study) => (
          <ProjectCard key={study.slug} study={study} />
        ))}
        <QuoteCta />
      </section>

      <section className="cell how" data-section="how" aria-labelledby="how-h">
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

      <div className="open open2" aria-hidden="true">
        <Fish />
      </div>

      <section className="cell photo" data-section="photos" aria-labelledby="photo-h">
        <div className="photo-head">
          <h2 id="photo-h">
            <span className="lbl">(e) photos</span>
            From above, through and across
          </h2>
          <a
            href={links.photos.url}
            target="_blank"
            rel="noopener noreferrer"
            data-track-label="Photos: see all"
          >
            See all photos <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="strip" aria-hidden="true">
          {photoPlaceholders.map((caption) => (
            <span key={caption} data-cap={caption} />
          ))}
        </div>
      </section>

      <section className="cell hello" id="hello" data-section="contact" aria-labelledby="hello-h">
        <Cat />
        <span className="lbl">(f) say hello</span>
        <h2 id="hello-h">
          Have a role or a project <em>in mind?</em>
        </h2>
        <p>
          I&apos;m always happy to talk about frontend, design systems, or a website you&apos;d like
          to exist. You can also find me on{' '}
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

      <div className="open open3" aria-hidden="true" />
    </main>
  );
}
