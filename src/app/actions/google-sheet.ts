'use server';

import { google } from 'googleapis';

/**
 * Appends a row to the configured Google Sheet using Service Account credentials.
 * Dynamically selects the tab based on the data type.
 * Handles every field from the Enrollment, Contact, and One-to-One forms.
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
    const targetTab = 
      data.type === 'enrollment' ? 'Enrollment' : 
      data.type === 'one-to-one' ? 'OneToOne' : 
      defaultTabName;

    // Validation
    if (!email || !privateKey || !sheetId) {
      return { 
        success: false, 
        error: "System Configuration Missing. Please ensure GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, and GOOGLE_SHEET_ID are set in your environment." 
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

    // 5. Authenticate with Google
    const auth = new google.auth.JWT(
      email,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    
    // 6. Construct Row Values with all fields
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    let rowValues: any[] = [];

    if (data.type === 'enrollment') {
      // ENROLLMENT - Full 25-column mapping
      rowValues = [
        timestamp,                                      // A: Timestamp
        data.admissionNo || 'N/A',                      // B: ID
        data.firstName || 'N/A',                        // C: First Name
        data.lastName || 'N/A',                         // D: Last Name
        data.email || 'N/A',                            // E: Email
        data.gender || 'N/A',                           // F: Gender (Dropdown)
        data.dob || 'N/A',                              // G: DOB
        data.religion || 'N/A',                         // H: Religion
        data.fatherName || 'N/A',                       // I: Father Name
        data.fatherNo || 'N/A',                         // J: Father Phone
        data.fatherOccupation || 'N/A',                 // K: Father Occupation
        data.motherName || 'N/A',                       // L: Mother Name
        data.motherNo || 'N/A',                         // M: Mother Phone
        data.motherOccupation || 'N/A',                 // N: Mother Occupation
        data.whatsappNo || 'N/A',                       // O: WhatsApp No
        data.academicYear || 'N/A',                     // P: Academic Year (Dropdown)
        data.standard || 'N/A',                         // Q: Standard (Dropdown)
        data.subjects ? (Array.isArray(data.subjects) ? data.subjects.join(', ') : data.subjects) : 'None', // R: Subjects (Checkboxes)
        data.otherSubject || '-',                       // S: Other Subject
        data.institutionName || 'N/A',                  // T: Institution
        data.board || 'N/A',                            // U: Board (Dropdown)
        data.batchTiming || 'N/A',                      // V: Timing
        data.feesDetails || 'N/A',                      // W: Fees
        data.admissionDate || 'N/A',                    // X: Date
        data.residentialAddress || 'N/A'                // Y: Address
      ];
    } else if (data.type === 'one-to-one') {
      // ONE-TO-ONE - 10-column mapping
      rowValues = [
        timestamp,
        data.name || 'N/A',
        data.mobileNumber || 'N/A',
        data.email || 'N/A',
        data.board || 'N/A',
        data.grade || 'N/A',
        data.individualConcern || '-',
        data.personalizedSchedule || '-',
        data.personalizedStudyMaterial || '-',
        data.weeklyGrowthTracking || '-'
      ];
    } else {
      // CONTACT - Standard mapping
      rowValues = [
        timestamp,
        'CONTACT',
        data.name || 'N/A',
        data.email || 'N/A',
        data.mobileNumber || 'N/A',
        data.subject || 'N/A',
        data.message || 'N/A'
      ];
    }

    // 7. Append to Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${targetTab}!A:A`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true, updatedRange: response.data.updates?.updatedRange };
  } catch (error: any) {
    console.error('Google Sheet Sync Error:', error);
    return { 
      success: false, 
      error: error.message || 'An internal error occurred during Google Sheets synchronization.' 
    };
  }
}