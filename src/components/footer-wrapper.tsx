
"use client";

import { usePathname } from 'next/navigation';
import { Footer } from './footer';
import { Footer2 } from './footer2';

export function FooterWrapper() {
  const pathname = usePathname();

  if (pathname === '/home2') {
    return <Footer2 />;
  }

  return <Footer />;
}
