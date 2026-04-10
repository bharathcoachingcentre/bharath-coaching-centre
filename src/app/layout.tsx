import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ClientHeader } from '@/components/client-header';
import { FooterWrapper } from '@/components/footer-wrapper';
import { Inter } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';
import { BackToTop } from '@/components/back-to-top';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Bharath Academy Hub',
  description: 'Welcome to Bharath Academy',
  icons: {
    icon: [
      { url: '/fav.ico?v=2', type: 'image/x-icon' },
    ],
    shortcut: '/fav.ico?v=2',
    apple: '/fav.ico?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Explicit fallback tags to ensure Firefox picks up the icon and bypasses cache */}
        {/* Firefox is strictly compliant and often requires these to be present early in the head */}
        <link rel="icon" href="/fav.ico?v=2" type="image/x-icon" sizes="any" />
        <link rel="shortcut icon" href="/fav.ico?v=2" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/fav.ico?v=2" />
      </head>
      <body className={`${inter.variable} font-body antialiased flex flex-col min-h-screen`}>
        <FirebaseClientProvider>
          <ClientHeader />
          <main className="flex-grow">{children}</main>
          <FooterWrapper />
          <BackToTop />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
