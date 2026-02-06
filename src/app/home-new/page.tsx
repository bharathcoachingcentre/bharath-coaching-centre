'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomeNewPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, [router]);
  return null;
}