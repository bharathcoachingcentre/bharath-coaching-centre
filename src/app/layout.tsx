import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ClientHeader } from '@/components/client-header';
import { FooterWrapper } from '@/components/footer-wrapper';
import { Inter } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';
import { BackToTop } from '@/components/back-to-top';
import { getAdminFirestore } from '@/lib/firebase-admin';
import { DynamicFavicon } from '@/components/dynamic-favicon';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = 'Bharath Academy Hub';
  const defaultIcon = '/favicon.ico';
  
  try {
    const db = getAdminFirestore();
    if (db) {
      // Attempt to fetch custom branding settings from Firestore
      // We use a try-catch inside to catch auth errors specific to the admin SDK
      const settingsSnap = await db.collection('settings').doc('academy').get();
      
      if (settingsSnap.exists) {
        const settings = settingsSnap.data();
        const icon = settings?.faviconUrl || defaultIcon;
        const title = settings?.name || defaultTitle;
        const isIco = icon.toLowerCase().endsWith('.ico');
        
        return {
          title,
          description: 'Welcome to Bharath Academy',
          icons: {
            icon: [
              { url: icon, type: isIco ? 'image/x-icon' : 'image/png' },
            ],
            shortcut: [{ url: icon, type: isIco ? 'image/x-icon' : 'image/png' }],
            apple: [
              { url: icon },
            ],
          },
        };
      }
    }
  } catch (e) {
    // Silent catch to prevent crashes if Admin SDK encounters issues (like 16 UNAUTHENTICATED)
  }
  
  return {
    title: defaultTitle,
    description: 'Welcome to Bharath Academy',
    icons: {
      icon: defaultIcon,
      shortcut: defaultIcon,
      apple: defaultIcon,
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
          <DynamicFavicon />
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
