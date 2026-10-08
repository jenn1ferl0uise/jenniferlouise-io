/**
 * A soft current that weaves down the page behind the cards and draws itself as the
 * page scrolls (see "Flow" in globals.css). Decorative only.
 */
export default function FlowLine() {
  const path = 'M 18 40 C 70 90, 92 170, 55 250 S 4 400, 38 500 S 96 640, 62 740 S 12 880, 48 1000';

  return (
    <svg
      className="flow-line"
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path className="flow-glow" d={path} pathLength={1} />
      <path className="flow-core" d={path} pathLength={1} />
    </svg>
  );
}
