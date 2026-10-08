/**
 * The feature catalogue: the building blocks a project is made of. Case studies list the features
 * they use, and the quote builder lets visitors switch them on and off, so both speak the same
 * language. Day ranges are rough solo-build estimates, used only for the "around N weeks" hint.
 */

export const FEATURE_GROUPS = [
  { id: 'people', label: 'People & access' },
  { id: 'content', label: 'Content' },
  { id: 'business', label: 'Running the business' },
  { id: 'extras', label: 'Extras' },
] as const;

export type FeatureGroupId = (typeof FEATURE_GROUPS)[number]['id'];

export interface Feature {
  label: string;
  description: string;
  group: FeatureGroupId;
  /** Rough build effort in working days, [min, max]. */
  days: readonly [number, number];
}

export const features = {
  auth: {
    label: 'Accounts & sign-in',
    description: 'People sign up, log in and reset their password.',
    group: 'people',
    days: [2, 4],
  },
  roles: {
    label: 'Roles & permissions',
    description: 'Different people see and do different things.',
    group: 'people',
    days: [2, 4],
  },
  collaboration: {
    label: 'Sharing & collaboration',
    description: 'Invite others and work on the same thing together.',
    group: 'people',
    days: [4, 8],
  },
  cms: {
    label: 'Admin panel',
    description: 'Edit pages, items and settings without a developer.',
    group: 'content',
    days: [5, 10],
  },
  uploads: {
    label: 'Image uploads',
    description: 'Upload, resize and order photos and files.',
    group: 'content',
    days: [2, 4],
  },
  i18n: {
    label: 'Multiple languages',
    description: 'The site in more than one language.',
    group: 'content',
    days: [2, 5],
  },
  search: {
    label: 'Search & filters',
    description: 'Find things quickly by keyword, date or category.',
    group: 'content',
    days: [2, 4],
  },
  bookings: {
    label: 'Bookings & calendar',
    description: 'Availability, reservations and a shared calendar.',
    group: 'business',
    days: [5, 10],
  },
  shop: {
    label: 'Product catalogue & cart',
    description: 'Products, variants, stock and a basket.',
    group: 'business',
    days: [5, 10],
  },
  payments: {
    label: 'Online payments',
    description: 'Take card payments, deposits or subscriptions.',
    group: 'business',
    days: [3, 6],
  },
  notifications: {
    label: 'Email notifications',
    description: 'Confirmations, reminders and updates by email.',
    group: 'business',
    days: [1, 3],
  },
  dashboard: {
    label: 'Dashboard & reports',
    description: 'Key numbers and lists at a glance.',
    group: 'business',
    days: [3, 6],
  },
  maps: {
    label: 'Maps & locations',
    description: 'Places, routes and addresses on a map.',
    group: 'extras',
    days: [2, 5],
  },
  ai: {
    label: 'AI-generated content',
    description: 'Text or suggestions written by an AI model.',
    group: 'extras',
    days: [3, 6],
  },
  analytics: {
    label: 'Analytics',
    description: 'See how people find and use the site.',
    group: 'extras',
    days: [1, 2],
  },
} as const satisfies Record<string, Feature>;

export type FeatureId = keyof typeof features;

export const FEATURE_IDS = Object.keys(features) as FeatureId[];

/** Design, setup, SEO basics and launch: part of every project, whatever is switched on. */
export const BASE_DAYS = [5, 8] as const;
