'use client';

import { useEffect } from 'react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

/**
 * A client-side component that synchronizes the browser tab branding (Title & Favicon)
 * with the settings stored in Firestore. This ensures branding updates even if
 * the server-side generateMetadata fails due to environment-specific Admin SDK issues.
 */
export function DynamicFavicon() {
  const firestore = useFirestore();
  const settingsRef = firestore ? doc(firestore, 'settings', 'academy') : null;
  const { data: settings } = useDoc(settingsRef);

  useEffect(() => {
    if (!settings) return;

    // 1. Update Document Title
    if (settings.name) {
      document.title = settings.name;
    }

    // 2. Update Favicon
    if (settings.faviconUrl) {
      // Update or create standard icon link
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      
      // Append timestamp to bust browser cache
      const cacheBuster = `?v=${new Date().getTime()}`;
      link.href = settings.faviconUrl + (settings.faviconUrl.startsWith('data:') ? '' : cacheBuster);
      
      // Update shortcut icon for older browsers
      let shortcutLink: HTMLLinkElement | null = document.querySelector("link[rel='shortcut icon']");
      if (shortcutLink) {
        shortcutLink.href = settings.faviconUrl;
      }

      // Update Apple Touch Icon
      let appleLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
      if (appleLink) {
        appleLink.href = settings.faviconUrl;
      }
    }
  }, [settings]);

  return null;
}
