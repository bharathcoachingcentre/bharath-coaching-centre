import Image from 'next/image';
import type { SVGProps } from 'react';
import { cn } from "@/lib/utils";

// Keep the props for compatibility with how it's used in the header/footer, but ignore them.
export function BccLogo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", props.className)}>
        <Image
        src="/BCC-logo.png"
        alt="BCC Logo"
        width={100}
        height={80}
        priority
        className="header-logo"
        style={{ width: 'auto' }}
        />
    </div>
  );
}
