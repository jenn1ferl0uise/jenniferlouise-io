'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export const useSectionTracking = (sectionId: string) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Track when section is 50% visible and hasn't been tracked yet
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !hasTracked.current) {
            trackEvent.sectionView(sectionId);
            hasTracked.current = true;
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [sectionId]);

  return sectionRef;
};
