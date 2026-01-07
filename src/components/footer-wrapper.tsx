"use client";

import { usePathname } from 'next/navigation';
import { Footer } from './footer';
import { Footer2 } from './footer2';
import { useState, useEffect } from 'react';

export function FooterWrapper() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render the default footer on the server to avoid mismatch
    return <Footer />;
  }

  if (pathname === '/home2') {
    return <Footer2 />;
  }

  return <Footer />;
}
