import type { FeatureId } from '@/content/features';
import { links } from '@/content/site';

/** `own`: my products and experiments. `client`: work scoped or built for someone else. */
export type WorkKind = 'own' | 'client';
export type WorkStatus = 'live' | 'poc' | 'proposal';

export interface Decision {
  /** What I noticed or worried about… */
  thought: string;
  /** …and what I built because of it. */
  implemented: string;
}

export interface Phase {
  name: string;
  features: FeatureId[];
  note?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  kind: WorkKind;
  status: WorkStatus;
  /** Card summary, in the "The friction → The flow" format. */
  friction: string;
  flow: string;
  role: string;
  liveUrl?: string;
  problem: string[];
  decisions: Decision[];
  features: FeatureId[];
  stack: string[];
  next: string[];
  /** How the work was (or would be) split up. Shown for client work and proposals. */
  phases?: Phase[];
  /** Drafts render in development only, never in a production build. */
  draft?: boolean;
}

export const WORK_KINDS: Record<WorkKind, string> = {
  own: 'my product',
  client: 'for a client',
};

export const WORK_STATUS: Record<WorkStatus, string> = {
  live: 'Live',
  poc: 'Proof of concept',
  proposal: 'Proposal',
};

/* Navizo -------------------------------------------------- */

const navizo: CaseStudy = {
  slug: 'navizo',
  title: 'Navizo',
  kind: 'own',
  status: 'live',
  friction: 'Trip plans scattered across group chats, notes and maps.',
  flow: 'Plan routes, keep the details and track costs, alone or together.',
  role: 'Product, design and build',
  liveUrl: links.navizo.url,
  problem: [
    'Every group trip I planned ended up split across a chat, a shared note, a spreadsheet for costs and a dozen pinned places on a map. Nobody had the full picture, and the person organising carried it all in their head.',
    'I wanted one place that holds the plan, the costs and the people, and that is pleasant enough to open on a phone over hotel wifi.',
  ],
  decisions: [
    {
      thought: 'Asking for an account before someone has planned anything feels like a wall.',
      implemented:
        'You can start a trip straight away. The draft is kept on the device and saved to your account when you sign in, so signing up feels like keeping something rather than a gate.',
    },
    {
      thought: 'The first screen is judged in a second, often on slow connections.',
      implemented:
        'The landing sky is a gradient painted in CSS, not a photograph, so it appears as soon as the stylesheet arrives with no image request at all.',
    },
    {
      thought: 'Light and dark mode usually feel like two different apps.',
      implemented:
        'Themes are treated as weather: the same sky tokens become a clear afternoon or dusk, and the interface itself stays neutral.',
    },
    {
      thought: 'Trip photos come from Unsplash, and photographers deserve the credit.',
      implemented:
        'Each trip stores its image and the author’s name, and the credit sits quietly on the trip card.',
    },
  ],
  features: ['auth', 'collaboration', 'maps', 'search'],
  stack: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'Supabase',
    'Unsplash API',
  ],
  next: [
    'Split costs between travellers, with a running balance.',
    'An offline-friendly itinerary for days with no signal.',
    'Suggested places based on where you are staying.',
  ],
};

/* TurboFlip -------------------------------------------------- */

const turboflip: CaseStudy = {
  slug: 'turboflip',
  title: 'TurboFlip',
  kind: 'own',
  status: 'live',
  friction: 'Resellers rewriting the same listing copy over and over.',
  flow: 'Titles, descriptions and tags for Vinted and eBay, generated in seconds.',
  role: 'Product, design and build',
  liveUrl: 'https://turboflip.jenniferlouise.io',
  problem: [
    'People who resell clothes list dozens of items a week, and each one needs a title, a description and tags that fit the marketplace. It is repetitive work, and it is easy to undersell an item by rushing it.',
    'The goal was to take a short description of an item and turn it into listing copy you can paste straight in.',
  ],
  decisions: [
    {
      thought: 'Every marketplace has its own limits and tone.',
      implemented:
        'The output is shaped per marketplace: title length, description style and tag format follow what Vinted and eBay expect.',
    },
    {
      thought: 'Resellers list from their phone, standing next to the item.',
      implemented:
        'A mobile-first, one-screen flow: describe the item, get the copy, tap to copy each part.',
    },
    {
      thought: 'AI output can be unpredictable.',
      implemented:
        'The model is asked for structured output that is checked before it is shown, so a broken response never reaches the user.',
    },
  ],
  features: ['ai', 'auth', 'analytics'],
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'LLM API'],
  next: [
    'Generate copy from a photo of the item.',
    'Save a personal style so the copy sounds like you.',
    'Bulk mode for listing a whole haul at once.',
  ],
};

/* Photos -------------------------------------------------- */

const photos: CaseStudy = {
  slug: 'photos',
  title: 'Photography',
  kind: 'own',
  status: 'live',
  friction: 'Years of my photos from above, through and across, with nowhere to show them.',
  flow: 'My photography site, with its own admin panel for uploads and collections.',
  role: 'Design and build',
  liveUrl: links.photos.url,
  problem: [
    'I photograph a lot, mostly from above, and the photos lived in folders and camera rolls. Portfolio platforms either compress the images badly or make every site look the same.',
    'I wanted a gallery that stays fast with hundreds of large images, and a way to add new photos without touching code.',
  ],
  decisions: [
    {
      thought: 'Hundreds of large images can make a gallery painfully slow.',
      implemented:
        'Images are served in modern formats at the right size for each screen and load lazily as you scroll.',
    },
    {
      thought: 'Adding photos should not need a developer, even if the developer is me.',
      implemented: 'A small admin panel behind sign-in to upload, caption and reorder photos.',
    },
    {
      thought: 'The photos should be the loudest thing on the page.',
      implemented:
        'A quiet interface where type and colour step back and the images fill the screen.',
    },
  ],
  features: ['auth', 'cms', 'uploads'],
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  next: ['Collections and stories that group photos by trip.', 'Prints, with a simple order flow.'],
};

/* Clinic Manager -------------------------------------------------- */

const clinicManager: CaseStudy = {
  slug: 'clinic-manager',
  title: 'Clinic Manager',
  kind: 'client',
  status: 'poc',
  friction: 'Patient records, appointments and history spread across spreadsheets.',
  flow: 'One place for records, scheduling and patient history.',
  role: 'Product thinking, design and build',
  liveUrl: 'https://clinic-manager.jenniferlouise.io/en',
  problem: [
    'Small clinics often run on spreadsheets and paper diaries. They work, until two people edit the same file or someone needs a patient’s full history quickly.',
    'This is a proof of concept: a way to test how records, appointments and history could live together, before talking to a real clinic.',
  ],
  decisions: [
    {
      thought: 'Patient data is sensitive, and not everyone should see everything.',
      implemented:
        'Roles were modelled before any screens, so reception and clinicians see different things from the start.',
    },
    {
      thought: 'Spreadsheets win because they are flexible.',
      implemented:
        'Patient history is a timeline of notes and visits rather than rigid forms, so it stays useful for different kinds of practice.',
    },
    {
      thought: 'Clinics and their patients don’t all speak the same language.',
      implemented:
        'Language-aware routes from day one, so adding a translation is a content task, not a rebuild.',
    },
  ],
  features: ['auth', 'roles', 'bookings', 'search', 'i18n', 'dashboard'],
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  next: [
    'Test the flows with a real clinic.',
    'An audit log of who viewed or changed a record.',
    'A data protection review before any real patient data.',
  ],
};

/* Property Manager -------------------------------------------------- */

const propertyManager: CaseStudy = {
  slug: 'property-manager',
  title: 'Property Manager',
  kind: 'client',
  status: 'live',
  friction: 'Rentals and bookings managed by hand.',
  flow: 'Properties, bookings and operations together in one view.',
  role: 'Freelance: scoping, estimate, design and build',
  liveUrl: 'https://property-manager.jenniferlouise.io/',
  problem: [
    'A small rental business was running its properties from messages, a shared calendar and a spreadsheet. Double bookings were a real risk, and guests asked the same questions every week.',
    'Before writing any code, I broke the project down into features and phases with a cost and time for each, so the client could choose what mattered most first.',
  ],
  decisions: [
    {
      thought: 'A fixed price for everything at once is a risk for both sides.',
      implemented:
        'The work was split into phases, each one useful on its own, so the client could start small and add the rest later.',
    },
    {
      thought: 'Double bookings are the most expensive mistake.',
      implemented:
        'One calendar is the source of truth for availability, and every booking goes through it.',
    },
    {
      thought: 'The owner is not technical and should not need me for small changes.',
      implemented:
        'An admin panel to edit properties, photos, prices and text without a developer.',
    },
  ],
  features: ['auth', 'cms', 'uploads', 'bookings', 'notifications', 'dashboard', 'i18n'],
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  phases: [
    {
      name: 'Foundations',
      features: ['auth', 'cms', 'uploads'],
      note: 'Properties, photos and content, editable by the owner.',
    },
    {
      name: 'Bookings',
      features: ['bookings', 'notifications'],
      note: 'One shared calendar, with confirmation emails.',
    },
    {
      name: 'Operations',
      features: ['dashboard', 'i18n'],
      note: 'An overview of the week, and the site in a second language.',
    },
  ],
  next: [
    'Online payments and deposits at booking time.',
    'Sync with the big booking platforms’ calendars.',
  ],
};

/* Clothing brand -------------------------------------------------- */

// TODO: replace with the real scoping breakdown.
const clothingBrand: CaseStudy = {
  slug: 'clothing-brand',
  title: 'Clothing brand',
  kind: 'client',
  status: 'proposal',
  draft: true,
  friction: 'A growing brand selling through social media messages.',
  flow: 'A scoped online shop, broken into phases with a clear estimate.',
  role: 'Scoping and estimate',
  problem: [
    'A small clothing brand wanted to move from taking orders in messages to a proper online shop.',
    'I scoped and quoted the project but did not take it on. The breakdown is still a good example of how I plan a build.',
  ],
  decisions: [
    {
      thought: 'An online shop can grow into a huge project.',
      implemented: 'The scope was split into a small first launch and clear later phases.',
    },
  ],
  features: ['shop', 'payments', 'cms', 'uploads', 'search', 'analytics'],
  stack: ['Next.js', 'React', 'TypeScript'],
  phases: [
    { name: 'Launch', features: ['shop', 'payments', 'uploads'] },
    { name: 'Grow', features: ['cms', 'search', 'analytics'] },
  ],
  next: [],
};

/* ------------------------------------------------------------------ */

/** Every case study, in the order they appear on the homepage. */
const caseStudies: CaseStudy[] = [
  navizo,
  turboflip,
  photos,
  clinicManager,
  propertyManager,
  clothingBrand,
];

const isVisible = (study: CaseStudy) => !study.draft || process.env.NODE_ENV !== 'production';

export const work: CaseStudy[] = caseStudies.filter(isVisible);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return work.find((study) => study.slug === slug);
}

export function getWorkByKind(kind: WorkKind): CaseStudy[] {
  return work.filter((study) => study.kind === kind);
}

/** Shown in the "Recent projects" card next to the hero, most recent first. */
const recentSlugs = ['navizo', 'photos', 'turboflip'];

export const recentWork = recentSlugs
  .map(getCaseStudy)
  .filter((study): study is CaseStudy => study !== undefined);
