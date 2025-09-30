'use client'

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// Generate or get session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics-session');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('analytics-session', sessionId);
  }
  return sessionId;
};

// Get page name from path
const getPageName = (path: string): string => {
  const segments = path.split('/').filter(Boolean);
  
  if (path === '/') return 'Home';
  if (path === '/question') return 'Submit Question';
  if (path === '/questions') return 'Questions Display';
  if (path === '/moderator') return 'Moderator Panel';
  if (path === '/analytics') return 'Analytics Dashboard';
  if (path === '/capture-the-flag-ethwarsaw') return 'CTF Challenge';
  if (path === '/hackathon-tracks') return 'Hackathon Tracks';
  if (path === '/vanity-market') return 'Vanity Market';
  if (path.startsWith('/getting-started/ts')) return 'Getting Started - TypeScript';
  if (path.startsWith('/getting-started/python')) return 'Getting Started - Python';
  
  return segments.join(' / ') || 'Unknown';
};

export const useAnalytics = () => {
  const pathname = usePathname();
  const lastPath = useRef<string>('');

  useEffect(() => {
    // Only track if path changed
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    // Don't track analytics page views
    if (pathname === '/analytics') return;

    const trackPageView = async () => {
      try {
        if (typeof window === 'undefined') return;

        const data = {
          page: getPageName(pathname),
          path: pathname,
          sessionId: getSessionId(),
          referrer: document.referrer,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
        };

        await fetch(`${API_BASE}/api/analytics/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Track after a short delay to ensure page is loaded
    const timeout = setTimeout(trackPageView, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);
};

// Hook to get analytics data
export const useAnalyticsData = (timeRange: 'today' | 'week' | 'month' | 'all' = 'week') => {
  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/analytics/stats?range=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      return null;
    }
  };

  return { fetchAnalytics };
};