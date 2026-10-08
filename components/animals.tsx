/**
 * Small hidden animals. Each one is only visible at certain times of day (see globals.css):
 * fish at day and sunset, cat at night, turtle at sunrise and day. Birds live in <Sky />.
 * The volcano is always there, puffing smoke by day and glowing at sunset and night.
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

export function Turtle() {
  return (
    <span className="animal turtle" aria-hidden="true">
      <svg width="42" height="24" viewBox="0 0 42 24">
        {/* far legs (behind the shell) */}
        <rect className="leg far" x="14" y="15" width="3.5" height="6" rx="1.6" />
        <rect className="leg far step-b" x="28" y="15" width="3.5" height="6" rx="1.6" />
        <path className="skin" d="M7 16 L3 18 L8 18 Z" />
        <g className="head">
          <path className="skin" d="M32 14 Q35 11 38.5 12 Q41 13.5 39 16 Q36 17.5 32 17 Z" />
          <circle className="eye" cx="37.5" cy="13.6" r="0.7" />
        </g>
        <path className="shell" d="M7 17 Q7 4 20 4 Q33 4 34 17 Z" />
        <path
          className="scutes"
          d="M13 16 L15 10 L20.5 8 L26 10 L28 16 M15 10 L11 9.5 M26 10 L30 9.5 M20.5 8 L20.5 4.5"
        />
        <rect className="rim" x="6" y="16" width="29" height="2.4" rx="1.2" />
        {/* near legs (in front) */}
        <rect className="leg" x="10" y="16" width="4" height="6.5" rx="1.8" />
        <rect className="leg step-b" x="25" y="16" width="4" height="6.5" rx="1.8" />
      </svg>
    </span>
  );
}

export function Volcano() {
  return (
    <span className="animal volcano" aria-hidden="true">
      <svg width="44" height="34" viewBox="0 0 52 40">
        <circle className="puff" cx="26" cy="14" r="4.5" />
        <circle className="puff" cx="28" cy="14" r="4" />
        <circle className="puff" cx="24" cy="14" r="3.5" />
        <path
          className="cone"
          d="M0 40 Q10 30 17 20 Q19 17.5 21 19 Q26 17 31 19 Q33 17.5 35 20 Q42 30 52 40 Z"
        />
        <ellipse className="lava" cx="26" cy="19.3" rx="4.6" ry="1.3" />
        <path className="lava" d="M24.5 20.2 Q22 26 18.5 31 Q23.5 27 26.5 20.4 Z" />
      </svg>
    </span>
  );
}
