import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import '../../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Samacheer Class 8 - Bharath Academy Hub',
  description: 'Study Materials for Samacheer Class 8',
};

export default function SamacheerClass8Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${plusJakartaSans.variable} ${dmSans.variable} font-body-home2`}>
      {children}
    </div>
  );
}
