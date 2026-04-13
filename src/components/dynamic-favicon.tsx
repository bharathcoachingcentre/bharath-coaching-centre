'use client';

import { useEffect } from 'react';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';

/**
 * A client-side component that synchronizes the browser tab branding (Title & Favicon)
 * with the settings stored in Firestore. This ensures branding updates even if
 * the server-side generateMetadata fails or if the browser has a cached icon.
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
      // Append timestamp to bust browser cache for external URLs
      const cacheBuster = `?v=${new Date().getTime()}`;
      const finalUrl = settings.faviconUrl + (settings.faviconUrl.startsWith('data:') ? '' : cacheBuster);

      // Update or create standard icon link
      let iconLink: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!iconLink) {
        iconLink = document.createElement('link');
        iconLink.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(iconLink);
      }
      iconLink.href = finalUrl;
      
      // Explicitly set type for .ico files if detected
      if (settings.faviconUrl.toLowerCase().endsWith('.ico')) {
        iconLink.type = 'image/x-icon';
      }

      // Update or create shortcut icon for older browsers (standard for .ico)
      let shortcutLink: HTMLLinkElement | null = document.querySelector("link[rel='shortcut icon']");
      if (!shortcutLink) {
        shortcutLink = document.createElement('link');
        shortcutLink.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(shortcutLink);
      }
      shortcutLink.href = finalUrl;

      // Update Apple Touch Icon
      let appleLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
      if (!appleLink) {
        appleLink = document.createElement('link');
        appleLink.rel = 'apple-touch-icon';
        document.getElementsByTagName('head')[0].appendChild(appleLink);
      }
      appleLink.href = finalUrl;
    }
  }, [settings]);

  return null;
}
