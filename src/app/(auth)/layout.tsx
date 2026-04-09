import type {Metadata} from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Sign In - Bharath Academy Hub',
  description: 'Sign in to your account',
  icons: {
    icon: '/fav.png',
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-body antialiased">
      {children}
    </div>
  );
}
