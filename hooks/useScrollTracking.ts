'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

const now = Date.now();

export const useScrollTracking = () => {
  const milestones = useRef(new Set<number>());
  const startTime = useRef<number>(now);

  useEffect(() => {
    let timeOnPageTracked = false;

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track scroll milestones: 25%, 50%, 75%, 100%
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !milestones.current.has(milestone)) {
          milestones.current.add(milestone);
          trackEvent.scrollDepth(milestone);
        }
      });
    };
    const currentStartTime = startTime.current;

    // Track time on page after 30 seconds
    const timeOnPageTimer = setTimeout(() => {
      if (!timeOnPageTracked) {
        const timeSpent = Math.round((Date.now() - currentStartTime) / 1000);
        trackEvent.timeOnPage(timeSpent, window.location.pathname);
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
        if (timeSpent > 5) { // Only track if spent more than 5 seconds
          trackEvent.timeOnPage(timeSpent, window.location.pathname);
        }
      }
    };
  }, []);
};