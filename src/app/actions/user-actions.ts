'use server';

import { getAdminAuth, getAdminFirestore } from '@/lib/firebase-admin';

export async function updateUserCredentialsAction(uid: string, data: {
  email?: string;
  password?: string;
  displayName?: string;
  role?: string;
  status?: string;
  phoneNumber?: string;
  photoURL?: string;
}) {
  try {
    const auth = getAdminAuth();
    const db = getAdminFirestore();

    // 1. Update Authentication Record
    const authUpdate: any = {};
    if (data.email) authUpdate.email = data.email.trim();
    if (data.password && data.password.length >= 6) authUpdate.password = data.password;
    if (data.displayName) authUpdate.displayName = data.displayName;
    if (data.photoURL) authUpdate.photoURL = data.photoURL;

    if (Object.keys(authUpdate).length > 0) {
      await auth.updateUser(uid, authUpdate);
    }

    // 2. Update Firestore Record
    // Explicitly destructure to ensure we have the specific fields requested
    const { password, ...firestoreData } = data;
    if (firestoreData.email) firestoreData.email = firestoreData.email.trim();

    // Ensure metadata fields are included if present
    const updatePayload: any = {
      ...firestoreData,
      updatedAt: new Date().toISOString(),
    };

    await db.collection('users').doc(uid).set(updatePayload, { merge: true });

    return { success: true };
  } catch (error: any) {
    console.error('Update user action error:', error);
    return { success: false, error: error.message };
  }
}

export async function createUserAccountAction(data: {
  email: string;
  password?: string;
  displayName: string;
  role: string;
  status: string;
  phoneNumber?: string;
  photoURL?: string;
  bio?: string;
  specialty?: string;
}) {
  try {
    const auth = getAdminAuth();
    const db = getAdminFirestore();

    const cleanEmail = data.email.trim();

    // 1. Create Authentication User
    const userRecord = await auth.createUser({
      email: cleanEmail,
      password: data.password || 'Temporary123!', // Fallback password
      displayName: data.displayName,
      photoURL: data.photoURL,
    });

    // 2. Create Firestore Profile
    const { password, ...firestoreData } = data;
    firestoreData.email = cleanEmail;

    await db.collection('users').doc(userRecord.uid).set({
      ...firestoreData,
      uid: userRecord.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return { success: true, uid: userRecord.uid };
  } catch (error: any) {
    console.error('Create user action error:', error);
    return { success: false, error: error.message };
  }
}
