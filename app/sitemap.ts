import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';
import { work } from '@/content/work';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/quote`, changeFrequency: 'monthly', priority: 0.8 },
    ...work.map(({ slug }) => ({
      url: `${SITE_URL}/work/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
