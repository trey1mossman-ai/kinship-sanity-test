import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed() {
  const nav = navigator as any;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

  if (!connection) return 'unknown';

  return connection.effectiveType || 'unknown';
}

function sendToAnalytics(metric: Metric) {
  const body = {
    dsn: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
    delta: metric.delta,
    rating: metric.rating,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value, metric.rating);
  }

  // Send to analytics endpoint
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, JSON.stringify(body));
  } else {
    fetch(vitalsUrl, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    });
  }
}

export function reportWebVitals() {
  // Core Web Vitals
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onFID(sendToAnalytics);  // First Input Delay
  onFCP(sendToAnalytics);  // First Contentful Paint
  onLCP(sendToAnalytics);  // Largest Contentful Paint
  onINP(sendToAnalytics);  // Interaction to Next Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}

// Performance observer for custom metrics
export function measurePerformance(name: string, startMark: string, endMark: string) {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];

    if (measure) {
      console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);

      // Send custom metric
      sendToAnalytics({
        name: 'custom',
        value: measure.duration,
        id: name,
        delta: measure.duration,
        rating: measure.duration < 1000 ? 'good' : measure.duration < 3000 ? 'needs-improvement' : 'poor',
        entries: [],
        navigationType: 'navigate',
      } as Metric);
    }
  } catch (error) {
    console.error('Performance measurement error:', error);
  }
}

// Mark critical loading points
export function markPerformance(name: string) {
  if (typeof window === 'undefined' || !window.performance) return;
  performance.mark(name);
}