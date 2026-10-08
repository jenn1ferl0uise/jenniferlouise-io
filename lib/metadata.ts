import type { Metadata } from 'next';
import { site } from '@/content/site';

export const DEFAULT_TITLE = `${site.fullName} | ${site.role}`;

const openGraphDefaults = { siteName: site.fullName, locale: 'en_GB', type: 'website' } as const;

/**
 * Per-page metadata. Next.js replaces `openGraph` and `twitter` objects rather than merging them,
 * so every page sets the full set here, with its own canonical URL.
 */
export function pageMetadata({
  title,
  description = site.description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : DEFAULT_TITLE;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphDefaults, title: fullTitle, description, url: path },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  };
}
