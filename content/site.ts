export const SITE_URL = 'https://www.jenniferlouise.io';

export const site = {
  name: 'Jennifer Louise',
  fullName: 'Jennifer Louise Lynch',
  role: 'Product Engineer',
  description:
    'Product engineer turning ideas into things people actually use, from the first sketch to the final release, with AI in the loop.',
  currently: 'Codeway',
  previously: ['Scopely', 'Thoughtworks', 'Marfeel'],
} as const;

export interface ExternalLink {
  label: string;
  url: string;
}

export const links = {
  photos: { label: 'Photography', url: 'https://photos.jenniferlouise.io' },
  navizo: { label: 'Navizo', url: 'https://navizo.jenniferlouise.io' },
  github: { label: 'GitHub', url: 'https://github.com/jenn1ferl0uise' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jennifer-louise-lynch' },
} satisfies Record<string, ExternalLink>;

export const principles = [
  { title: 'Listen before building.', body: 'Understand where the friction really is first.' },
  { title: 'Small, steady steps.', body: 'Ship in pieces people can try and react to.' },
  { title: 'The details matter.', body: 'Accessibility, speed and the moments in between.' },
] as const;

export interface NowItem {
  /** What kind of thing it is, shown as a small label. */
  kind: 'working' | 'learning' | 'building';
  title: string;
  detail: string;
  /** Optional internal link, e.g. a case study. */
  href?: string;
}

/** The "Now" card beside the hero: what I'm working on and learning. Update `nowUpdated` with it. */
export const nowUpdated = 'October 2026';

export const now: NowItem[] = [
  {
    kind: 'working',
    title: 'Vue at Codeway',
    detail: 'Shipping product features, with AI as part of my everyday workflow.',
  },
  {
    kind: 'learning',
    title: 'UX and product',
    detail: 'Research, flows and deciding what is worth building in the first place.',
  },
  {
    kind: 'learning',
    title: 'Backend, data and infra',
    detail: 'APIs, databases and the infrastructure that keeps a product running.',
  },
];
