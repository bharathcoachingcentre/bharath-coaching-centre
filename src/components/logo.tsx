import Image from 'next/image';
import type { SVGProps } from 'react';
import { cn } from "@/lib/utils";

// Keep the props for compatibility with how it's used in the header/footer, but ignore them.
export function Logo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", props.className)}>
        <Image
        src="/logo.png"
        alt="Bharath Coaching Centre Logo"
        width={60}
        height={60}
        priority
        className="h-auto"
        style={{ width: 'auto' }}
        />
        <div>
            <span className="font-bold text-lg leading-tight block text-sky-500">BHARATH</span>
            <span className="text-xs leading-tight block text-gray-600">Coaching Centre</span>
            <span className="text-[0.6rem] leading-tight block text-gray-500">Since 2008</span>
        </div>
    </div>
  );
}
