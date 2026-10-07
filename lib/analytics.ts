import { track } from '@vercel/analytics';

const EventTypes = {
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
  CONTACT_FORM_ERROR: 'contact_form_error',
  CONTACT_FORM_CLICKED: 'contact_form_clicked',
  CONTACT_BTN_CLICKED: 'contact_btn_clicked',
  HOME_BTN_CLICKED: 'home_btn_clicked',
  CV_BTN_CLICKED: 'cv_btn_clicked',
  SECTION_VIEWED: 'section_viewed',
  EXTERNAL_LINK_CLICKED: 'external_link_clicked',
  PROJECTS_BTN_CLICKED: 'projects_btn_clicked',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
} as const;

type EventTypes = (typeof EventTypes)[keyof typeof EventTypes];
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
  projectsBtnClick: () => {
    track(EventTypes.PROJECTS_BTN_CLICKED);
  },
  contactBtnClick: () => {
    track(EventTypes.CONTACT_BTN_CLICKED);
  },
  homeBtnClick: () => {
    track(EventTypes.HOME_BTN_CLICKED);
  },
  cvBtnClick: () => {
    track(EventTypes.CV_BTN_CLICKED);
  },

  externalLinkClick: (url: string, label: string) => {
    track(EventTypes.EXTERNAL_LINK_CLICKED, { url, label });
  },

  // Engagement events
  scrollDepth: (percentage: number) => {
    track(EventTypes.SCROLL_DEPTH, { percentage });
  },

  timeOnPage: (seconds: number, page: string) => {
    track(EventTypes.TIME_ON_PAGE, { seconds, page });
  },
};
