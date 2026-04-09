'use server';

import { google } from 'googleapis';

/**
 * Appends a row to the configured Google Sheet using Service Account credentials.
 * Sensitive variables are read from process.env on the server.
 */
export async function appendToGoogleSheetAction(data: any) {
  try {
    const email = process.env.SERVICE_EMAIL;
    let privateKey = process.env.PRIVATE_KEY;
    let sheetId = process.env.SHEET_ID;
    const tabName = process.env.TAB_NAME || 'Sheet1';

    if (!email || !privateKey || !sheetId) {
      throw new Error('Missing configuration: SERVICE_EMAIL, PRIVATE_KEY, or SHEET_ID is not set in environment variables.');
    }

    // Handle newline characters in private key (common issue in env files)
    privateKey = privateKey.replace(/\\n/g, '\n');

    // Extract Sheet ID if the user provided the full URL
    if (sheetId.includes('docs.google.com/spreadsheets/d/')) {
      const parts = sheetId.split('/d/');
      if (parts[1]) {
        sheetId = parts[1].split('/')[0];
      }
    }

    const auth = new google.auth.JWT(
      email,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Construct values based on form type
    let rowValues: any[] = [];
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    if (data.type === 'contact') {
      rowValues = [
        timestamp,
        'CONTACT',
        data.name,
        data.email,
        data.mobileNumber,
        data.subject,
        data.message
      ];
    } else {
      rowValues = [
        timestamp,
        `ENROLLMENT: ${data.admissionNo || 'N/A'}`,
        `${data.firstName} ${data.lastName}`,
        data.email,
        data.whatsappNo,
        data.standard,
        data.board,
        data.subjects ? (Array.isArray(data.subjects) ? data.subjects.join(', ') : data.subjects) : ''
      ];
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!A:A`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Google Sheet Server Action Error:', error);
    // Return the specific error message to the frontend for debugging
    return { success: false, error: error.message };
  }
}
