import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

/**
 * Initializes and returns the Firebase Admin Auth instance.
 * Returns null if initialization fails.
 */
export function getAdminAuth() {
  if (admin.apps.length > 0) {
    return admin.auth();
  }

  try {
    const keyPath = path.join(process.cwd(), 'serviceaccountkey.json');
    if (fs.existsSync(keyPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      return admin.auth();
    }
  } catch (e) {
    console.error('Firebase Admin init error:', e);
  }
  return null;
}

/**
 * Initializes and returns the Firebase Admin Firestore instance.
 * Returns null if the Firebase Admin SDK could not be initialized.
 */
export function getAdminFirestore() {
  // Ensure the app is initialized
  const auth = getAdminAuth();
  if (!auth) return null;
  
  try {
    return admin.firestore();
  } catch (e) {
    console.error('Firestore Admin access error:', e);
    return null;
  }
}
