
'use server';

import { google } from 'googleapis';

/**
 * Appends a row to the configured Google Sheet using Service Account credentials.
 * Dynamically selects the tab based on the data type.
 */
export async function appendToGoogleSheetAction(data: any) {
  try {
    // 1. Read and clean environment variables
    const getEnv = (key: string) => {
      const val = process.env[key];
      if (!val) return '';
      
      let cleaned = val.trim();
      if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.substring(1, cleaned.length - 1);
      }
      return cleaned.trim();
    };

    const email = getEnv('GOOGLE_SHEETS_CLIENT_EMAIL');
    let privateKey = getEnv('GOOGLE_SHEETS_PRIVATE_KEY');
    let sheetId = getEnv('GOOGLE_SHEET_ID');
    const defaultTabName = getEnv('GOOGLE_SHEET_TAB_NAME') || 'contact';

    // 2. Determine target tab name
    // If it's an enrollment, use the "Enrollment" tab. Otherwise use the default (contact).
    const targetTab = data.type === 'contact' ? defaultTabName : 'Enrollment';

    // Validation
    if (!email || !privateKey || !sheetId) {
      return { 
        success: false, 
        error: "System Configuration Missing. Please check your environment variables." 
      };
    }

    // 3. Format Private Key
    privateKey = privateKey.replace(/\\n/g, '\n');
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`;
    }

    // 4. Extract Sheet ID from URL if necessary
    if (sheetId.includes('docs.google.com/spreadsheets/d/')) {
      const parts = sheetId.split('/d/');
      if (parts[1]) {
        sheetId = parts[1].split('/')[0];
      }
    }

    // 5. Authenticate
    const auth = new google.auth.JWT(
      email,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    
    // 6. Construct Row Values
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    let rowValues: any[] = [];

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
        data.subjects ? (Array.isArray(data.subjects) ? data.subjects.join(', ') : data.subjects) : 'N/A'
      ];
    }

    // 7. Append to Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${targetTab}!A:A`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Google Sheet Sync Error:', error);
    return { success: false, error: error.message || 'Unknown server error' };
  }
}
