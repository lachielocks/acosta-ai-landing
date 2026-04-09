import { useState, useEffect, useCallback } from 'react';

export function useRouter() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePop = () => setPathname(window.location.pathname);
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
