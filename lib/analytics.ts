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
  QUOTE_PRESET_SELECTED: 'quote_preset_selected',
  QUOTE_FEATURE_TOGGLED: 'quote_feature_toggled',
  TIME_ON_PAGE: 'time_on_page',
} as const;

type FormErrorType = 'email' | 'message' | 'failed' | 'incomplete';

/** The homepage "say hello" form or the quote builder's form. */
export type FormSource = 'hello' | 'quote';

export const trackEvent = {
  contactFormSubmit: (source: FormSource) => {
    track(EventTypes.CONTACT_FORM_SUBMITTED, { source });
  },
  contactFormError: (type: FormErrorType, source: FormSource) => {
    track(EventTypes.CONTACT_FORM_ERROR, { type, source });
  },
  contactFormClick: (source: FormSource) => {
    track(EventTypes.CONTACT_FORM_CLICKED, { source });
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

  // Quote builder
  quotePresetSelect: (preset: string) => {
    track(EventTypes.QUOTE_PRESET_SELECTED, { preset });
  },
  quoteFeatureToggle: (feature: string, on: boolean) => {
    track(EventTypes.QUOTE_FEATURE_TOGGLED, { feature, on });
  },

  // Engagement events
  scrollDepth: (percentage: number) => {
    track(EventTypes.SCROLL_DEPTH, { percentage });
  },
  timeOnPage: (seconds: number, page: string) => {
    track(EventTypes.TIME_ON_PAGE, { seconds, page });
  },
};
