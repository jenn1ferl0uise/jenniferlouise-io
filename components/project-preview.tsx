'use client';

import { useEffect, useRef } from 'react';
import type { PreviewMedia } from '@/content/previews';

/**
 * Muted looping clip of a project site. Loads and plays only while on screen, and stays on
 * its poster frame for visitors who prefer reduced motion.
 */
export default function ProjectPreview({ media }: { media: PreviewMedia }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion.matches) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-media" aria-hidden="true">
      <video ref={videoRef} poster={media.poster} muted loop playsInline preload="none">
        {media.webm && <source src={media.webm} type="video/webm" />}
        {media.mp4 && <source src={media.mp4} type="video/mp4" />}
      </video>
    </div>
  );
}
