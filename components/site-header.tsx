import Link from 'next/link';
import { links, site } from '@/content/site';

export default function SiteHeader() {
  return (
    <header className="cell nav">
      <Link href="/" className="name">
        {site.name}
      </Link>
      <nav aria-label="Main">
        <ul>
          <li>
            <Link href="/#work">Work</Link>
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
            <Link href="/#hello">Say hello</Link>
          </li>
          <li>
            <Link href="/quote" className="nav-cta">
              Get a quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
