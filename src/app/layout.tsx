import type {Metadata} from 'next';
import './globals.css';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { ClientHeader } from '@/components/client-header';


export const metadata: Metadata = {
  title: 'Bharath Academy Hub',
  description: 'Welcome to Bharath Academy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/fav.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ClientHeader />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
