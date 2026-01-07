
"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Footer } from './footer';
import { Footer2 } from './footer2';

export function FooterWrapper() {
  const pathname = usePathname();
  const [isHome2, setIsHome2] = useState(false);

  useEffect(() => {
    setIsHome2(pathname === '/home2');
  }, [pathname]);

  if (isHome2) {
    return <Footer2 />;
  }

  // Render the default footer on the server and for the initial client render
  // for all paths to prevent hydration mismatch.
  return <Footer />;
}
