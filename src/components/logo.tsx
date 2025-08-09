import Image from 'next/image';
import type { SVGProps } from 'react';

// Keep the props for compatibility with how it's used in the header/footer, but ignore them.
export function Logo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <Image
    src="/logo.png"
    alt="Bharath Academy Logo"
    width={183}
    height={40}
    priority
    className="header-logo"
    />
  );
}
