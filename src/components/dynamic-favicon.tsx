'use client';

import { useEffect } from 'react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

/**
 * A client-side component that synchronizes the browser tab branding (Title & Favicon)
 * with the settings stored in Firestore. This ensures branding updates even if
 * the server-side generateMetadata fails or if the browser has a cached icon.
 */
export function DynamicFavicon() {
  const firestore = useFirestore();
  
  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'settings', 'academy');
  }, [firestore]);

  const { data: settings } = useDoc(settingsRef);

  useEffect(() => {
    if (!settings) return;

    // 1. Update Document Title
    if (settings.name) {
      document.title = settings.name;
    }

    // 2. Update Favicon
    if (settings.faviconUrl) {
      const iconUrl = settings.faviconUrl;
      const isIco = iconUrl.toLowerCase().endsWith('.ico');
      const type = isIco ? 'image/x-icon' : 'image/png';
      
      // Add a timestamp to bypass cache for external URLs
      const cacheBuster = `?v=${new Date().getTime()}`;
      const finalUrl = iconUrl.startsWith('data:') ? iconUrl : `${iconUrl}${cacheBuster}`;

      const updateLink = (rel: string) => {
        // Find existing link or create new one
        let link: HTMLLinkElement | null = document.querySelector(`link[rel*='${rel}']`);
        
        if (!link) {
          link = document.createElement('link');
          link.rel = rel;
          document.head.appendChild(link);
        }
        
        link.href = finalUrl;
        link.type = type;
      };

      // Update all standard icon relation types
      updateLink('icon');
      updateLink('shortcut icon');
      updateLink('apple-touch-icon');
    }
  }, [settings]);

  return null;
}
