'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/** Scroll depth and time on page, measured afresh for each pathname. */
export const useScrollTracking = (pathname: string) => {
  useEffect(() => {
    const milestones = new Set<number>();
    const currentStartTime = Date.now();
    let timeOnPageTracked = false;

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track scroll milestones: 25%, 50%, 75%, 100%
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !milestones.has(milestone)) {
          milestones.add(milestone);
          trackEvent.scrollDepth(milestone);
        }
      });
    };

    // Track time on page after 30 seconds
    const timeOnPageTimer = setTimeout(() => {
      if (!timeOnPageTracked) {
        const timeSpent = Math.round((Date.now() - currentStartTime) / 1000);
        trackEvent.timeOnPage(timeSpent, pathname);
        timeOnPageTracked = true;
      }
    }, 30000); // 30 seconds

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeOnPageTimer);

      // Track final time on page when leaving
      if (!timeOnPageTracked) {
        const timeSpent = Math.round((Date.now() - currentStartTime) / 1000);
        if (timeSpent > 5) {
          // Only track if spent more than 5 seconds
          trackEvent.timeOnPage(timeSpent, pathname);
        }
      }
    };
  }, [pathname]);
};
