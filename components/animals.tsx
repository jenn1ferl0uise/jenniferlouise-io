/**
 * Small hidden animals. Each one is only visible at certain times of day (see globals.css):
 * fish at day and sunset, cat at night, snail at sunrise and day. Birds live in <Sky />.
 */

export function Fish() {
  return (
    <span className="animal-fish" aria-hidden="true">
      <span className="animal fish">
        <svg width="30" height="14" viewBox="0 0 30 14">
          <path d="M2 7 Q10 0 20 7 Q10 14 2 7 Z M20 7 L28 1 L26 7 L28 13 Z" />
        </svg>
      </span>
      <span className="splash" />
    </span>
  );
}

export function Cat() {
  return (
    <span className="animal cat" aria-hidden="true">
      <svg width="56" height="32" viewBox="0 0 56 32">
        <ellipse cx="30" cy="24" rx="22" ry="9" />
        <circle cx="14" cy="17" r="8" />
        <path d="M8 12 L9 3 L14 10 Z M15 10 L20 3 L20 12 Z" />
        <path d="M50 26 Q58 18 50 12 Q54 20 46 24 Z" />
        <ellipse className="eye" cx="12" cy="17" rx="1.3" ry="1.3" />
        <ellipse className="eye" cx="17" cy="17" rx="1.3" ry="1.3" />
      </svg>
    </span>
  );
}

export function Snail() {
  return (
    <span className="animal snail" aria-hidden="true">
      <svg width="26" height="16" viewBox="0 0 26 16">
        <path className="body" d="M0 15 Q4 11 10 12 L22 12 Q25 12 25 15 Z" />
        <path className="horns" d="M3 12 L1 6 M5 12 L5 6" />
        <circle className="shell" cx="15" cy="8" r="6" />
        <circle className="shell" cx="15" cy="8" r="3" />
      </svg>
    </span>
  );
}
