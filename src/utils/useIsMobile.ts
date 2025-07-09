import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Match Tailwind's `sm` breakpoint: 640px
    const mediaQuery = window.matchMedia('(max-width: 639.98px)');

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Update on change
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
}
