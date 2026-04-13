import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ClientHeader } from '@/components/client-header';
import { FooterWrapper } from '@/components/footer-wrapper';
import { Inter } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';
import { BackToTop } from '@/components/back-to-top';
import { getAdminFirestore } from '@/lib/firebase-admin';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export async function generateMetadata(): Promise<Metadata> {
  let settings: any = null;
  try {
    const db = getAdminFirestore();
    const settingsSnap = await db.collection('settings').doc('academy').get();
    settings = settingsSnap.data();
  } catch (e) {
    console.error("Metadata fetch error:", e);
  }
  
  const icon = settings?.faviconUrl || '/favicon.ico';
  const title = settings?.name || 'Bharath Academy Hub';
  
  return {
    title,
    description: 'Welcome to Bharath Academy',
    icons: {
      icon: icon,
      shortcut: icon,
      apple: icon,
    },
  };
}

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
