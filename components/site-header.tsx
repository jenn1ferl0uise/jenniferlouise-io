import Link from 'next/link';
import { site } from '@/content/site';

/**
 * Inner pages only: a way back home and to the contact form. The homepage has no nav, since its
 * hero already links to the work and the form.
 */
export default function SiteHeader() {
  return (
    <header className="subnav">
      <Link href="/" className="name">
        <span aria-hidden="true">← </span>
        {site.name}
      </Link>
      <Link href="/#hello">Say hello</Link>
    </header>
  );
}
