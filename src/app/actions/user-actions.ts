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
    // Build a clean payload to ensure exact field names are preserved
    const updatePayload: any = {
      updatedAt: new Date().toISOString(),
    };

    if (data.email) updatePayload.email = data.email.trim();
    if (data.displayName) updatePayload.displayName = data.displayName;
    if (data.role) updatePayload.role = data.role;
    if (data.status) updatePayload.status = data.status;
    if (data.phoneNumber !== undefined) updatePayload.phoneNumber = data.phoneNumber;
    if (data.photoURL) updatePayload.photoURL = data.photoURL;

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
