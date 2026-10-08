/**
 * Sites to record for the moving project previews.
 * `id` must match the project id in content/site.ts.
 *
 * Optional `steps` replace the default "scroll, open a page, scroll" tour:
 *   { type: 'scroll', by: 0.4 }        scroll by a fraction of the page height (or px if > 1)
 *   { type: 'click', selector: 'a' }   click the first match (skipped if not found)
 *   { type: 'wait', ms: 500 }
 */
export const targets = [
  { id: 'navizo', url: 'https://navizo.jenniferlouise.io' },
  { id: 'turboflip', url: 'https://turboflip.jenniferlouise.io' },
  { id: 'photos', url: 'https://photos.jenniferlouise.io' },
  { id: 'clinic-manager', url: 'https://clinic-mananger.jenniferlouise.io/en' },
  { id: 'property-manager', url: 'https://property-mananger.jenniferlouise.io/' },
];

/** Recording size (the clip is scaled down to OUTPUT_WIDTH afterwards). */
export const VIEWPORT = { width: 1280, height: 800 };
export const OUTPUT_WIDTH = 800;
export const DURATION_SECONDS = 5;
