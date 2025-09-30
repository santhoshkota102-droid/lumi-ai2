import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Validation schema
interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  businessGoals: string;
  serviceType: string;
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate phone number (basic)
function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Helper function to validate form data
function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters long');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.whatsapp || !isValidPhoneNumber(data.whatsapp)) {
    errors.push('Please provide a valid WhatsApp number');
  }

  if (!data.businessGoals || data.businessGoals.trim().length < 10) {
    errors.push('Business goals must be at least 10 characters long');
  }

  if (!data.serviceType || data.serviceType.trim().length < 2) {
    errors.push('Please select a service type');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Initialize Google Sheets client
async function getGoogleSheetsClient() {
  try {
    // Parse private key and handle newlines
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    if (!privateKey || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error('Missing Google Sheets credentials');
    }

    const auth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw new Error('Failed to initialize Google Sheets client');
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate form data
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    const formData: FormData = {
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      whatsapp: body.whatsapp.trim(),
      businessGoals: body.businessGoals.trim(),
      serviceType: body.serviceType.trim(),
    };

    // Initialize Google Sheets client
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = '1lwFo4LOcoExCIhxg9v399ctPPvB-AhylVjUsoEwSMVU';

    // Check if headers exist, if not create them
    try {
      const headerCheck = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A1:E1',
      });

      if (!headerCheck.data.values || headerCheck.data.values.length === 0) {
        // Add headers if they don't exist
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Sheet1!A1:E1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [
              ['Full Name', 'Email', 'whatsapp', 'Business Goals & Challenges', 'Choose Your Service']
            ],
          },
        });
      }
    } catch (headerError) {
      console.warn('Could not check/create headers:', headerError);
    }

    // Prepare data row with timestamp
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const rowData = [
      formData.fullName,
      formData.email,
      formData.whatsapp,
      formData.businessGoals,
      formData.serviceType,
      timestamp // Add timestamp in column F
    ];

    // Append data to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    // Log successful submission
    console.log('Form submission successful:', {
      email: formData.email,
      timestamp,
      rowsAdded: response.data.updates?.updatedRows || 0
    });

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        submittedAt: timestamp,
        rowsAdded: response.data.updates?.updatedRows || 0
      }
    });

  } catch (error) {
    console.error('Error processing form submission:', error);

    // Handle specific Google Sheets API errors
    if (error instanceof Error) {
      if (error.message.includes('credentials')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Server configuration error. Please try again later.' 
          },
          { status: 500 }
        );
      }

      if (error.message.includes('spreadsheet')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Unable to access spreadsheet. Please try again later.' 
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
}