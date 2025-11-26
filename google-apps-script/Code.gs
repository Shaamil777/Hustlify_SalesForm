// Google Apps Script for Form Submission to Google Sheets
// Deploy this as a Web App with "Anyone" access

function doGet(e) {
  return ContentService.createTextOutput("Form submission endpoint is working!");
}

function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log('Received POST request');
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));
    Logger.log('Post data: ' + e.postData);
    
    // Parse the incoming data - handle both FormData and JSON
    let data;
    if (e.parameter && e.parameter.data) {
      // Data sent as FormData
      data = JSON.parse(e.parameter.data);
    } else if (e.postData && e.postData.contents) {
      // Data sent as JSON
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No data received');
    }
    
    Logger.log('Parsed data: ' + JSON.stringify(data));
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Country Code',
        'Phone Number',
        'Sales Experience',
        'Educational Qualification',
        'About You'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Append the form data as a new row
    sheet.appendRow([
      new Date(),
      data.firstName,
      data.lastName,
      data.email,
      data.countryCode,
      data.phoneNumber,
      data.salesExperience,
      data.educationalQualification,
      data.aboutYou
    ]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 9);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Form data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testDoPost() {
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    countryCode: '+1',
    phoneNumber: '1234567890',
    salesExperience: 'experienced',
    educationalQualification: 'Bachelor of Science',
    aboutYou: 'This is a test submission to verify the Google Apps Script integration works correctly.'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
