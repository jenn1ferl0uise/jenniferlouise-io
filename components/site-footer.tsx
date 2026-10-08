import Link from 'next/link';
import TimeOfDayToggle from '@/components/time-of-day-toggle';
import { Turtle } from '@/components/animals';
import { links, site } from '@/content/site';

export default function SiteFooter() {
  return (
    <footer className="cell foot">
      <span className="lbl">
        © {new Date().getFullYear()} {site.fullName.toLowerCase()}
      </span>
      <TimeOfDayToggle />
      <span className="lbl foot-links">
        <Link href="/quote">get a quote</Link>
        {' · '}
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
  );
}
