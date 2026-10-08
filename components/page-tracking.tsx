'use client';

import { useEffect } from 'react';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { trackEvent } from '@/lib/analytics';

/**
 * Analytics for the server-rendered page, so sections and links can stay server components:
 * - sections marked with `data-section="name"` report once when half visible
 * - links marked with `data-track-label="name"` report external clicks
 */
export default function PageTracking() {
  useScrollTracking();

  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name || !entry.isIntersecting || seen.has(name)) return;
          seen.add(name);
          trackEvent.sectionView(name);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll<HTMLElement>('[data-section]').forEach((el) => observer.observe(el));

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-track-label]');
      if (link) trackEvent.externalLinkClick(link.href, link.dataset.trackLabel ?? link.href);
    };
    document.addEventListener('click', handleClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
