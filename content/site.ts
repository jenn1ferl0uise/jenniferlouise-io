export const SITE_URL = 'https://www.jenniferlouise.io';

export const site = {
  name: 'Jennifer Louise',
  fullName: 'Jennifer Louise Lynch',
  role: 'Frontend Engineer',
  description:
    'Frontend engineer with 7+ years building React and TypeScript products. Calm, careful interfaces, plus photography from above.',
  previously: ['Scopely', 'Thoughtworks', 'Marfeel'],
} as const;

export interface ExternalLink {
  label: string;
  url: string;
}

export const links = {
  photos: { label: 'Photos', url: 'https://photos.jenniferlouise.io' },
  navizo: { label: 'Navizo', url: 'https://navizo.jenniferlouise.io' },
  github: { label: 'GitHub', url: 'https://github.com/jenn1ferl0uise' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jennifer-louise-lynch' },
} satisfies Record<string, ExternalLink>;

export type ProjectKind = 'product' | 'client';

export interface Project {
  id: string;
  /** "product": my own products; "client": work built for clients. */
  kind: ProjectKind;
  title: string;
  url: string;
  friction: string;
  flow: string;
  /** Optional tech tags, shown as small pills. Leave empty until confirmed. */
  tags?: string[];
}

export const projects: Project[] = [
  {
    id: 'navizo',
    kind: 'product',
    title: 'Navizo',
    url: links.navizo.url,
    friction: 'Trip plans scattered across group chats, notes and maps.',
    flow: 'Plan routes, keep the details and track costs, alone or together.',
  },
  {
    id: 'turboflip',
    kind: 'product',
    title: 'TurboFlip',
    url: 'https://turboflip.jenniferlouise.io',
    friction: 'Resellers rewriting the same listing copy over and over.',
    flow: 'Titles, descriptions and tags for Vinted and eBay, generated in seconds.',
  },
  {
    id: 'photos',
    kind: 'product',
    title: 'Photos',
    url: links.photos.url,
    friction: 'Thousands of photos and nowhere good to show them.',
    flow: 'A custom portfolio with an admin panel for uploads.',
  },
  {
    id: 'clinic-manager',
    kind: 'client',
    title: 'Clinic Manager',
    url: 'https://clinic-mananger.jenniferlouise.io/en',
    friction: 'Patient records, appointments and history spread across spreadsheets.',
    flow: 'One place for records, scheduling and patient history.',
  },
  {
    id: 'property-manager',
    kind: 'client',
    title: 'Property Manager',
    url: 'https://property-mananger.jenniferlouise.io/',
    friction: 'Rentals and bookings managed by hand.',
    flow: 'Properties, bookings and operations together in one view.',
  },
];

export const productProjects = projects.filter((project) => project.kind === 'product');
export const clientProjects = projects.filter((project) => project.kind === 'client');

export const principles = [
  { title: 'Listen before building.', body: 'Understand where the friction really is first.' },
  { title: 'Small, steady steps.', body: 'Ship in pieces people can try and react to.' },
  { title: 'The details matter.', body: 'Accessibility, speed and the moments in between.' },
] as const;

/** Shown in the "Recent projects" card next to the hero, most recent first. */
export const recentProjectIds = ['navizo', 'photos', 'turboflip'] as const;

export const recentProjects = recentProjectIds
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => project !== undefined);
