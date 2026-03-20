import { track } from "@vercel/analytics";

enum EventTypes {
  CONTACT_FORM_SUBMITTED = "contact_form_submitted",
  CONTACT_FORM_ERROR = "contact_form_error",
  CONTACT_FORM_CLICKED = "contact_form_clicked",
  CONTACT_BTN_CLICKED = "contact_btn_clicked",
  HOME_BTN_CLICKED = "home_btn_clicked",
  CV_BTN_CLICKED = "cv_btn_clicked",
  SECTION_VIEWED = "section_viewed",
  EXTERNAL_LINK_CLICKED = "external_link_clicked",
  PROJECTS_BTN_CLICKED = "projects_btn_clicked",
}
type FormErrorType = 'email' | 'message' | 'failed' | 'incomplete'

export const trackEvent = {
  contactFormSubmit: () => {
    track(EventTypes.CONTACT_FORM_SUBMITTED);
  },
  contactFormError: (type: FormErrorType) => {
    track(EventTypes.CONTACT_FORM_ERROR, {type});
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

  externalLinkClick: (url: string, label: string, timestamp: string) => {
    track(EventTypes.EXTERNAL_LINK_CLICKED, { url, label, timestamp });
  },

  // Engagement events
  scrollDepth: (percentage: number) => {
    track("scroll_depth", { percentage });
  },

  timeOnPage: (seconds: number, page: string) => {
    track("time_on_page", { seconds, page });
  },
};
