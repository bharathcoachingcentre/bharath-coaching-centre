import Image from 'next/image';
import type { SVGProps } from 'react';
import { cn } from "@/lib/utils";

export function BccFooterLogo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", props.className)}>
        <Image
        src="/BCC-logo.png"
        alt="BCC Logo"
        width={90}
        height={80}
        priority
        className="footer-logo"
        style={{ width: 'auto' }}
        />
    </div>
  );
}
