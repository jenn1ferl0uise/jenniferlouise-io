import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = `${site.fullName}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social preview: the sunset sky with the name on a soft card, matching the site. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 64,
        background:
          'linear-gradient(180deg, #2e2463 0%, #e8547a 38%, #ffb267 62%, #0e5a6b 62.5%, #072a35 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 820,
          top: 250,
          width: 170,
          height: 170,
          borderRadius: 999,
          background: '#ffd28a',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: '40px 48px',
          borderRadius: 28,
          background: '#f8efe5',
          color: '#2a2030',
        }}
      >
        <div style={{ fontSize: 30, color: '#6f5f6a' }}>{site.fullName}</div>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>
          Frontend engineer turning friction into flow.
        </div>
      </div>
    </div>,
    size
  );
}
