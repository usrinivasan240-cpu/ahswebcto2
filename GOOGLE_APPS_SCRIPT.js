// ========================================
// GOOGLE APPS SCRIPT FOR AUTOHUB FORM
// ========================================
//
// INSTRUCTIONS:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1OzdQ-B__cHqbuNp2GTRUxYqxP9t8F1d_SmPeOga1yDo/edit?usp=sharing
// 2. Go to Extensions > Apps Script
// 3. Delete any existing code and paste this entire file
// 4. Save the script (Ctrl+S or Cmd+S)
// 5. Click Deploy > New deployment
// 6. Click the gear icon (⚙️) > Web app
// 7. Configure:
//    - Description: AutoHub Form Handler
//    - Execute as: Me (your email)
//    - Who has access: Anyone ⚠️ (IMPORTANT!)
// 8. Click Deploy
// 9. Copy the Web App URL
// 10. Open script.js in your website project
// 11. Replace GOOGLE_SCRIPT_URL with your Web App URL
// 12. Save and deploy your website
// ========================================

function doPost(e) {
  try {
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the JSON data from the form
    var data = JSON.parse(e.postData.contents);

    // Add new row with all form data
    // Column order: Timestamp | Name | Business Name | Phone | Email | Requirement | Plan
    sheet.appendRow([
      new Date(),                    // Timestamp (auto-generated)
      data.name,                     // Name from form
      data.businessName,             // Business Name from form
      data.phone,                    // Phone from form
      data.email,                    // Email from form
      data.requirement,              // Automation Requirement from form
      data.plan                      // Plan Interested from form
    ]);

    // Log the submission for debugging
    Logger.log('New form submission from: ' + data.name);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());

    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'error': error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// OPTIONAL: doGet for testing
// ========================================
// You can test your deployment by visiting the Web App URL in a browser
// This function returns a simple confirmation message

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'active',
      'message': 'AutoHub Form Handler is running',
      'timestamp': new Date()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// OPTIONAL: Setup function
// ========================================
// Run this function once to set up your sheet with headers
// Note: This will add headers to row 1 of your sheet

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add headers if they don't exist
  if (sheet.getRange("A1").getValue() === "") {
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Business Name",
      "Phone",
      "Email",
      "Requirement",
      "Plan"
    ]);

    // Format the header row
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#008cff").setFontColor("#ffffff");

    Logger.log("Sheet headers added successfully");
  } else {
    Logger.log("Sheet already has headers");
  }
}
