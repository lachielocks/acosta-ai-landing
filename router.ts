import { useState, useEffect, useCallback } from 'react';

function normalizePath(p: string): string {
  // Remove trailing slash (but keep "/" as-is)
  return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
}

export function useRouter() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );

  useEffect(() => {
    const handlePop = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState(null, '', path);
    setPathname(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { pathname, navigate };
}
