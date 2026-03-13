import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

export function getAdminAuth() {
  if (!admin.apps.length) {
    try {
      const keyPath = path.join(process.cwd(), 'serviceaccountkey.json');
      const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (e) {
      console.error('Firebase Admin init error:', e);
    }
  }
  return admin.auth();
}

export function getAdminFirestore() {
  if (!admin.apps.length) {
    getAdminAuth();
  }
  return admin.firestore();
}