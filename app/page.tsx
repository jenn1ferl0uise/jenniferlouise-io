import ContactForm from '@/components/contact-form';
import PageTracking from '@/components/page-tracking';
import ProjectCard from '@/components/project-card';
import Sky from '@/components/sky';
import TimeOfDayToggle from '@/components/time-of-day-toggle';
import { Cat, Fish, Snail } from '@/components/animals';
import { links, principles, projects, site } from '@/content/site';

const photoPlaceholders = ['from above', 'water', 'through', 'lines'];

export default function Home() {
  return (
    <div className="site">
      <Sky />
      <PageTracking />

      <div className="grid">
        <header className="nav">
          <a href="#top" className="name">
            {site.name}
          </a>
          <nav aria-label="Main">
            <ul>
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a
                  href={links.photos.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-label="Nav: Photos"
                >
                  Photos <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={links.navizo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-label="Nav: Navizo"
                >
                  Navizo <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href="#hello">Say hello</a>
              </li>
            </ul>
          </nav>
        </header>

        <main id="main" className="contents">
          <section className="cell hero" id="top" data-section="hero" aria-labelledby="hero-h">
            <span className="lbl">(a) hello</span>
            <h1 id="hero-h">
              <span className="sr-only">{site.fullName}, </span>
              Frontend engineer turning <em>friction into flow.</em>
            </h1>
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

          <div className="open open1" id="work">
            <h2 className="sky-chip">
              <span className="lbl">(b) work</span>
              Things I&apos;ve <em>built</em>
            </h2>
          </div>

          {projects.map((project, i) => (
            <div key={project.id} className={`w${i + 1}`} data-section={`project:${project.id}`}>
              <ProjectCard project={project} />
            </div>
          ))}

          <section className="cell how" data-section="how" aria-labelledby="how-h">
            <span className="lbl">(c) how i work</span>
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
                <span className="lbl">(d) photos</span>
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

          <div className="open open3" aria-hidden="true" />
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
          <Snail />
        </footer>
      </div>
    </div>
  );
}
