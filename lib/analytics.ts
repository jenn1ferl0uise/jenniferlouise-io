import { track } from '@vercel/analytics';
import type { TimeOfDay } from '@/lib/time-of-day';

const EventTypes = {
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
  CONTACT_FORM_ERROR: 'contact_form_error',
  CONTACT_FORM_CLICKED: 'contact_form_clicked',
  SECTION_VIEWED: 'section_viewed',
  EXTERNAL_LINK_CLICKED: 'external_link_clicked',
  TIME_OF_DAY_CHANGED: 'time_of_day_changed',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
} as const;

type FormErrorType = 'email' | 'message' | 'failed' | 'incomplete';

export const trackEvent = {
  contactFormSubmit: () => {
    track(EventTypes.CONTACT_FORM_SUBMITTED);
  },
  contactFormError: (type: FormErrorType) => {
    track(EventTypes.CONTACT_FORM_ERROR, { type });
  },
  contactFormClick: () => {
    track(EventTypes.CONTACT_FORM_CLICKED);
  },
  sectionView: (section: string) => {
    track(EventTypes.SECTION_VIEWED, { section });
  },
  externalLinkClick: (url: string, label: string) => {
    track(EventTypes.EXTERNAL_LINK_CLICKED, { url, label });
  },
  timeOfDayChange: (time: TimeOfDay) => {
    track(EventTypes.TIME_OF_DAY_CHANGED, { time });
  },

  // Engagement events
  scrollDepth: (percentage: number) => {
    track(EventTypes.SCROLL_DEPTH, { percentage });
  },
  timeOnPage: (seconds: number, page: string) => {
    track(EventTypes.TIME_ON_PAGE, { seconds, page });
  },
};
