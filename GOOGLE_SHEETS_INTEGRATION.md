# Google Sheets Integration Documentation

## Overview

The AutoHub Solutions website now includes a complete integration with Google Sheets via Google Apps Script Web App. This allows all enquiry form submissions to be automatically stored in a Google Sheet for easy management and follow-up.

## Integration Details

### Backend Configuration
- **Google Apps Script URL**: `https://script.google.com/macros/s/AKfycbx5yqGCHcYyQbAa4nyIP37qhmbPXhYCB0X2UPwicLwKbfBWgnwr_1urKKi2P0UumGyF/exec`
- **Method**: HTTP POST
- **Content-Type**: application/json
- **Mode**: no-cors (required for Google Apps Script)

### Data Structure
Each form submission sends the following JSON payload:

```json
{
  "name": "Customer Name",
  "business": "Business Name", 
  "phone": "9876543210",
  "email": "customer@example.com",
  "requirement": "Automation needs description",
  "plan": "Basic"
}
```

### Google Sheet Columns
The Google Sheet contains the following columns:
- **Column A**: Timestamp (auto-generated)
- **Column B**: Name
- **Column C**: Business Name  
- **Column D**: Phone
- **Column E**: Email
- **Column F**: Requirement
- **Column G**: Plan

## Features Implemented

### ✅ All Requirements Met

1. **HTTP POST Request**: Form data is sent using POST method to the specified URL
2. **JSON Format**: Data is properly formatted as JSON with required keys
3. **No Page Reload**: Form submission uses `e.preventDefault()` to prevent page refresh
4. **Response Handling**: Proper error handling and success messaging
5. **Success Message**: Shows "Thank you! Our team will contact you soon." on successful submission
6. **Field Validation**: All required fields are validated before submission
7. **Cross-Device Compatibility**: Works on desktop and mobile devices
8. **Secure JavaScript**: Input sanitization and XSS protection

### Enhanced Features

- **Advanced Validation**: Real-time field validation with specific error messages
- **Input Sanitization**: All inputs are sanitized to prevent XSS attacks
- **Loading States**: Visual feedback during form submission
- **Error Handling**: User-friendly error messages with auto-dismiss
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive Design**: Optimized for all screen sizes

## Form Fields

| Field | HTML ID | JSON Key | Validation |
|-------|---------|----------|------------|
| Name | `name` | `name` | Required |
| Business Name | `businessName` | `business` | Required |
| Phone | `phone` | `phone` | Required + Indian format (6-9)xxxxxxxx |
| Email | `email` | `email` | Required + valid email format |
| Requirement | `requirement` | `requirement` | Required |
| Plan | `plan` | `plan` | Required |

## Validation Rules

### Phone Number
- Must be 10 digits
- Must start with 6, 7, 8, or 9 (Indian mobile format)
- Regex: `/^[6-9]\d{9}$/`

### Email
- Must be valid email format
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Required Fields
All fields are mandatory and will show specific error messages if empty.

## User Experience

### Form Submission Flow
1. User fills out the form
2. Client-side validation checks all fields
3. Invalid fields show specific error messages
4. Valid form shows "Submitting..." with disabled button
5. Data is sent to Google Apps Script via POST request
6. Success message appears: "Thank you! Our team will contact you soon."
7. User can reset form to submit another enquiry

### Error Handling
- **Network Errors**: Shows user-friendly message about connection issues
- **Validation Errors**: Field-specific messages with visual indicators
- **Form Reset**: Easy reset functionality to try again

## Testing

### Test Page
A dedicated test page is available at: `test-google-sheets-integration.html`

This page includes:
- Integration status check
- Live test form
- Verification instructions
- Expected behavior documentation

### Testing Steps
1. Open the test page
2. Fill out the test form
3. Submit and verify success message appears
4. Check Google Sheet for new entry
5. Test with invalid data to verify error handling

## Technical Implementation

### JavaScript Functions
- `validateForm()`: Comprehensive form validation
- `sanitizeInput()`: XSS protection
- `showFieldError()`: Field-specific error display
- `showErrorMessage()`: General error handling
- `showSuccessMessage()`: Success state management
- `resetForm()`: Form reset functionality

### CSS Classes
- `.form-group.error`: Visual error state for fields
- `.error-message`: Individual field error styling
- `.form-error-message`: General error banner styling
- `.success-message`: Success state styling

## Security Features

1. **Input Sanitization**: All user inputs are sanitized before submission
2. **XSS Protection**: HTML entities are properly escaped
3. **CORS Handling**: Uses no-cors mode for Google Apps Script compatibility
4. **Error Information**: Sensitive error details are not exposed to users

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Works without JavaScript (basic form submission)

## Performance

- **Lightweight**: No external dependencies for form handling
- **Fast Validation**: Client-side validation provides instant feedback
- **Optimized Requests**: Minimal payload size with proper JSON formatting
- **Error Recovery**: Graceful handling of network issues

## Maintenance

### Updating the Integration
To update the Google Apps Script URL or modify the integration:

1. Update `GOOGLE_SCRIPT_URL` in `script.js`
2. Modify form field mapping if needed
3. Update validation rules as required
4. Test thoroughly using the test page

### Monitoring
- Check Google Sheet regularly for new submissions
- Monitor form submission success rates
- Review error logs in browser console for debugging

## Support

For technical support or questions about the integration:
- Check browser console for error messages
- Verify Google Apps Script is deployed and accessible
- Test using the dedicated test page
- Ensure all required fields are properly validated

---

**Integration Status**: ✅ **FULLY IMPLEMENTED AND TESTED**

All requirements have been successfully implemented with enhanced features for better user experience and security.