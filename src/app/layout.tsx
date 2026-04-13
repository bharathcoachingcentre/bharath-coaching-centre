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
      const settingsSnap = await db.collection('settings').doc('academy').get();
      
      if (settingsSnap.exists) {
        const settings = settingsSnap.data();
        const icon = settings?.faviconUrl || defaultIcon;
        const title = settings?.name || defaultTitle;
        
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
    }
  } catch (e) {
    // Silent catch to prevent 16 UNAUTHENTICATED errors from displaying visually to the user
    // This ensures the app still renders with default metadata if Admin SDK init fails
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
