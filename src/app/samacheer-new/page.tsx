'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SamacheerNewPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/samacheer');
  }, [router]);
  return null;
}
