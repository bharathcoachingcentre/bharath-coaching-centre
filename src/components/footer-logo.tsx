
import Image from 'next/image';
import type { SVGProps } from 'react';
import { cn } from "@/lib/utils";

export function FooterLogo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm", props.className)}>
        <Image
        src="/footer-logo.png"
        alt="Bharath Academy Logo"
        width={90}
        height={80}
        priority
        className="footer-logo"
        style={{ width: 'auto' }}
        />
    </div>
  );
}
