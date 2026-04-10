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
      { url: '/fav.ico', type: 'image/x-icon' },
    ],
    shortcut: '/fav.ico',
    apple: '/fav.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
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
