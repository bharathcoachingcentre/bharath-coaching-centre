
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Bharath Academy',
  description: 'Manage Bharath Academy data',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="font-bold text-xl text-[#182d45]">Admin Panel</div>
            </div>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}
