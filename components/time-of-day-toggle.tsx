'use client';

import { useSyncExternalStore } from 'react';
import { trackEvent } from '@/lib/analytics';
import { TIMES_OF_DAY, applyTimeOfDay, type TimeOfDay } from '@/lib/time-of-day';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-time'] });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.dataset.time ?? null;
const getServerSnapshot = () => null;

export default function TimeOfDayToggle() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const select = (time: TimeOfDay) => {
    applyTimeOfDay(time);
    trackEvent.timeOfDayChange(time);
  };

  return (
    <div className="sky-toggle" role="group" aria-label="Change the sky">
      <span className="lbl">sky</span>
      {TIMES_OF_DAY.map((time) => (
        <button
          key={time}
          type="button"
          aria-pressed={current === time}
          onClick={() => select(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
