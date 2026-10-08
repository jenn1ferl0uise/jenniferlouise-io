import { Fish } from '@/components/animals';

/** Decorative time-of-day sky behind the whole page. Colours come from the [data-time] tokens in globals.css. */
export default function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky-gradient" />
      <div className="sky-stars" />
      <div className="sky-sun" />
      <div className="sky-shimmer" />
      <span className="fish-spot">
        <Fish />
      </span>
      <span className="animal birds">
        <svg width="54" height="22" viewBox="0 0 54 22">
          <g>
            <path d="M0 8 Q6 1 12 8 Q18 1 24 8" />
          </g>
          <g transform="translate(28 10)">
            <path d="M0 6 Q5 0 10 6 Q15 0 20 6" />
          </g>
        </svg>
      </span>
    </div>
  );
}
