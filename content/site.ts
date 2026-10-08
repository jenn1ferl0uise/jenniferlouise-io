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

export const principles = [
  { title: 'Listen before building.', body: 'Understand where the friction really is first.' },
  { title: 'Small, steady steps.', body: 'Ship in pieces people can try and react to.' },
  { title: 'The details matter.', body: 'Accessibility, speed and the moments in between.' },
] as const;
