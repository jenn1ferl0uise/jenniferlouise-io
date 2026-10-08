import ContactForm from '@/components/contact-form';
import PageTracking from '@/components/page-tracking';
import ProjectGroup from '@/components/project-group';
import Sky from '@/components/sky';
import TimeOfDayToggle from '@/components/time-of-day-toggle';
import { Cat, Turtle } from '@/components/animals';
import {
  clientProjects,
  links,
  principles,
  productProjects,
  recentProjects,
  site,
} from '@/content/site';

export default function Home() {
  return (
    <div className="site">
      <Sky />
      <PageTracking />

      <div className="grid">
        <main id="main" className="contents">
          <section className="cell hero" id="top" data-section="hero" aria-labelledby="hero-h">
            <span className="lbl">(a) hello</span>
            <h1 id="hero-h">{site.name}</h1>
            <p className="tagline">
              Frontend engineer turning <em>friction into flow.</em>
            </p>
            <p>
              Seven years building React and TypeScript products. I like the small details that make
              software feel calm, and I photograph the world from above when I&apos;m not at a
              keyboard.
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

          <section className="cell recent glass" data-section="recent" aria-labelledby="recent-h">
            <h2 id="recent-h" className="lbl">
              recent projects
            </h2>
            <ul>
              {recentProjects.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-label={`Recent: ${project.title}`}
                  >
                    <strong>
                      {project.title} <span aria-hidden="true">↗</span>
                    </strong>
                    <span>{project.flow}</span>
                  </a>
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
            projects={productProjects}
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
            projects={clientProjects}
          >
            <article className="cell cta" aria-labelledby="cta-h">
              <span className="lbl">your project?</span>
              <h3 id="cta-h">This space is free</h3>
              <p>Have an idea that needs a website or an app? Tell me about it.</p>
              <a className="btn primary" href="#hello">
                Get in touch
              </a>
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

          <section
            className="cell hello"
            id="hello"
            data-section="contact"
            aria-labelledby="hello-h"
          >
            <Cat />
            <span className="lbl">(e) say hello</span>
            <h2 id="hello-h">
              Have a role or a project <em>in mind?</em>
            </h2>
            <p>
              I&apos;m always happy to talk about frontend, design systems, or a website you&apos;d
              like to exist. You can also find me on{' '}
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

        <footer className="cell foot">
          <span className="lbl">
            © {new Date().getFullYear()} {site.fullName.toLowerCase()}
          </span>
          <TimeOfDayToggle />
          <span className="lbl foot-links">
            <a
              href={links.github.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track-label="Footer: GitHub"
            >
              github
            </a>
            {' · '}
            <a
              href={links.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track-label="Footer: LinkedIn"
            >
              linkedin
            </a>
          </span>
          <Turtle />
        </footer>
      </div>
    </div>
  );
}
