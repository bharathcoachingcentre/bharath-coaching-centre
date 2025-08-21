import Image from 'next/image';
import type { SVGProps } from 'react';
import { cn } from "@/lib/utils";

export function FooterLogo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", props.className)}>
        <Image
        src="/footer-logo.png"
        alt="Bharath Academy Logo"
        width={100}
        height={80}
        priority
        className="header-logo"
        style={{ width: 'auto' }}
        />
    </div>
  );
}
