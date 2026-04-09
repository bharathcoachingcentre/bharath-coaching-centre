'use server';

import { google } from 'googleapis';

/**
 * Appends a row to the configured Google Sheet using Service Account credentials.
 * Sensitive variables are read from process.env on the server.
 */
export async function appendToGoogleSheetAction(data: any) {
  try {
    // 1. Read and clean environment variables
    const getEnv = (key: string) => {
      let val = process.env[key] || '';
      val = val.trim();
      // Strip surrounding quotes if present (common in some env loaders)
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      return val;
    };

    const email = getEnv('GOOGLE_SHEETS_CLIENT_EMAIL');
    let privateKey = getEnv('GOOGLE_SHEETS_PRIVATE_KEY');
    let sheetId = getEnv('GOOGLE_SHEET_ID');
    const tabName = getEnv('GOOGLE_SHEET_TAB_NAME') || 'Sheet1';

    if (!email || !privateKey || !sheetId) {
      const missing = [];
      if (!email) missing.push('GOOGLE_SHEETS_CLIENT_EMAIL');
      if (!privateKey) missing.push('GOOGLE_SHEETS_PRIVATE_KEY');
      if (!sheetId) missing.push('GOOGLE_SHEET_ID');
      throw new Error(`Missing environment variables: ${missing.join(', ')}`);
    }

    // 2. Format Private Key correctly
    // Replace literal '\n' string with actual newline character
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    // Ensure it has the proper headers
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
    }

    // 3. Extract Sheet ID from URL if provided
    if (sheetId.includes('docs.google.com/spreadsheets/d/')) {
      const parts = sheetId.split('/d/');
      if (parts[1]) {
        sheetId = parts[1].split('/')[0];
      }
    }

    // 4. Authenticate
    const auth = new google.auth.JWT(
      email,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    
    // 5. Construct Row Values
    let rowValues: any[] = [];
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    if (data.type === 'contact') {
      rowValues = [
        timestamp,
        'CONTACT',
        data.name || 'N/A',
        data.email || 'N/A',
        data.mobileNumber || 'N/A',
        data.subject || 'N/A',
        data.message || 'N/A'
      ];
    } else {
      rowValues = [
        timestamp,
        `ENROLLMENT: ${data.admissionNo || 'N/A'}`,
        `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        data.email || 'N/A',
        data.whatsappNo || 'N/A',
        data.standard || 'N/A',
        data.board || 'N/A',
        data.subjects ? (Array.isArray(data.subjects) ? data.subjects.join(', ') : data.subjects) : ''
      ];
    }

    // 6. Append to Sheet
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
    console.error('Google Sheet Sync Error:', error);
    // Return a readable error message for the UI toast
    let message = error.message || 'Unknown server error';
    if (message.includes('invalid_grant')) {
      message = 'Invalid Private Key or Service Account Email. Check your .env formatting.';
    } else if (message.includes('403') || message.includes('permission')) {
      message = 'Permission denied. Ensure the Google Sheet is shared with the Service Account email as an Editor.';
    } else if (message.includes('404')) {
      message = 'Spreadsheet not found. Check your GOOGLE_SHEET_ID.';
    }
    return { success: false, error: message };
  }
}
