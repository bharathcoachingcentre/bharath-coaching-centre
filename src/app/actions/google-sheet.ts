'use server';

import { google } from 'googleapis';

/**
 * Appends a row to the configured Google Sheet using Service Account credentials.
 * Sensitive variables are read from process.env on the server.
 */
export async function appendToGoogleSheetAction(data: any) {
  try {
    const email = process.env.SERVICE_EMAIL;
    const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.SHEET_ID;
    const tabName = process.env.TAB_NAME || 'Sheet1';

    if (!email || !privateKey || !sheetId) {
      throw new Error('Missing Google Sheets configuration in environment variables.');
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
    return { success: false, error: error.message };
  }
}