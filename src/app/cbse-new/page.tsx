
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CbseNewPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/cbse');
  }, [router]);
  return null;
}
