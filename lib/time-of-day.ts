export const TIMES_OF_DAY = ['sunrise', 'day', 'sunset', 'night'] as const;
export type TimeOfDay = (typeof TIMES_OF_DAY)[number];

export const DEFAULT_TIME_OF_DAY: TimeOfDay = 'sunset';

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 10) return 'sunrise';
  if (hour >= 10 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'sunset';
  return 'night';
}

/**
 * Runs before first paint so the sky matches the visitor's local time without a flash.
 * Keep the hour ranges in sync with getTimeOfDay.
 */
export const timeOfDayScript = `(function(){try{var h=new Date().getHours();var t=h>=5&&h<10?'sunrise':h>=10&&h<17?'day':h>=17&&h<21?'sunset':'night';document.documentElement.dataset.time=t;}catch(e){}})();`;

/** The sky is driven by html[data-time]; changing it repaints the whole page via CSS tokens. */
export function applyTimeOfDay(time: TimeOfDay) {
  document.documentElement.dataset.time = time;
}
