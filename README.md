# AutoHub Solutions - Official Website

A modern, professional website for AutoHub Solutions - a WhatsApp and AI automation startup based in Trichy, Tamil Nadu.

## 🌐 Live Demo

[Deploy your website on GitHub Pages, Firebase, or any static hosting platform]

## ✨ Features

- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- **Modern UI/UX**: Premium black and blue theme with elegant animations
- **Single Page Application**: Smooth scrolling navigation
- **Contact Form**: Professional enquiry form with validation
- **Google Sheets Integration**: Store form submissions directly in Google Sheets
- **AI Chatbot**: Embedded BotPress chatbot for instant customer interaction
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Fast Loading**: Optimized CSS and minimal JavaScript

## 📋 Prerequisites

Before deploying, you need to set up Google Sheets integration:

### Google Sheets Setup (Required)

1. **Open your Google Sheet**:
   - Link: https://docs.google.com/spreadsheets/d/1OzdQ-B__cHqbuNp2GTRUxYqxP9t8F1d_SmPeOga1yDo/edit?usp=sharing

2. **Create the Apps Script**:
   - Go to `Extensions` > `Apps Script`
   - Delete any existing code

3. **Paste this code**:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Add new row with timestamp
    sheet.appendRow([
      new Date(),
      data.name,
      data.businessName,
      data.phone,
      data.email,
      data.requirement,
      data.plan
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. **Deploy as Web App**:
   - Click `Deploy` > `New deployment`
   - Click the gear icon (⚙️) > `Web app`
   - **Description**: AutoHub Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone ⚠️ (Important: Select "Anyone" for public form submissions)
   - Click `Deploy`

5. **Copy the Web App URL**:
   - You'll get a URL like: `https://script.google.com/macros/s/.../exec`
   - Copy this URL

6. **Update your website**:
   - Open `script.js`
   - Replace `const GOOGLE_SCRIPT_URL = '';` with your URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   ```
   - Save the file

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended, Free)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AutoHub Solutions website"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click `Settings` > `Pages`
   - Under `Source`, select `main` branch
   - Click `Save`

3. **Your website will be live at**:
   - `https://<your-username>.github.io/<repo-name>/`

### Option 2: Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase login
   firebase init
   ```
   - Select `Hosting`
   - Select your Firebase project (or create one)
   - Public directory: `.` (current directory)
   - Configure as single-page app: `Yes`
   - Set up automatic builds with GitHub: `No`

3. **Deploy**:
   ```bash
   firebase deploy
   ```

### Option 3: Netlify (Drag & Drop)

1. Go to [netlify.com](https://netlify.com)
2. Sign up/log in
3. Drag and drop your project folder into the Netlify dashboard
4. Your website will be live instantly!

## 📁 Project Structure

```
autohub-website/
├── index.html          # Main HTML file
├── styles.css          # All styles including button CSS
├── script.js           # JavaScript functionality
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

## 🎨 Customization

### Changing Theme Colors

Edit `styles.css` and modify these variables:

```css
:root {
    --primary-black: #000000;
    --secondary-black: #0a0a0a;
    --accent-blue: #008cff;  /* Change this for different accent color */
    --text-white: #ffffff;
    --text-gray: #b0b0b0;
    --card-bg: #111111;
    --border-color: #333333;
}
```

### Updating Contact Information

Edit `index.html` and search for these sections:
- **Footer**: Update email, phone, business hours, location
- **About Section**: Update company details

### Updating Pricing

Edit the pricing section in `index.html`:

```html
<div class="pricing-card">
    <h3>Your Plan Name</h3>
    <div class="price">₹X,XXX</div>
    <ul class="pricing-features">
        <li>✓ Feature 1</li>
        <li>✓ Feature 2</li>
    </ul>
    <button onclick="selectPlan('YourPlan')">Choose Plan</button>
</div>
```

## 🤖 Chatbot Configuration

The chatbot is already embedded using BotPress. To customize:

1. Go to your BotPress dashboard
2. Create/Edit your chatbot
3. Export the configuration URL
4. Replace in `index.html`:

```html
<script src="https://cdn.botpress.cloud/webchat/v3.5/shareable.html?configUrl=YOUR_CONFIG_URL" defer></script>
```

## 📱 Testing

Test your website on different devices:

```bash
# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Responsive Testing
- **Desktop**: Resize browser window
- **Mobile**: Use Chrome DevTools (F12) → Device Toolbar (Ctrl+Shift+M)

## 🔒 Security Notes

1. **Google Sheets**: Your Google Apps Script Web App is set to "Anyone" access. This is necessary for public form submissions.
2. **Form Validation**: Client-side validation is implemented. Consider adding server-side validation for production.
3. **HTTPS**: Always deploy with HTTPS (GitHub Pages, Firebase, and Netlify provide this automatically).

## 📊 Google Sheet Columns

The form data is stored in this order:

1. **Timestamp**: Auto-generated date/time
2. **Name**: User's full name
3. **Business Name**: User's company/business name
4. **Phone**: Contact number
5. **Email**: Email address
6. **Requirement**: Automation needs description
7. **Plan**: Selected pricing plan

## 🐛 Troubleshooting

### Form Not Submitting to Google Sheets

**Check**: Is `GOOGLE_SCRIPT_URL` set in `script.js`?

**Solution**:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
```

**Check**: Is the Google Apps Script deployed as a Web App with "Anyone" access?

**Solution**:
1. Go to Apps Script
2. Deploy > Manage deployments
3. Edit deployment
4. Ensure "Who has access" is set to "Anyone"

### Chatbot Not Showing

**Check**: Is the chatbot script URL correct?

**Solution**: Verify the BotPress configuration URL is valid and accessible.

### Images Not Loading

**Solution**: Ensure all image paths are correct. For external images, use HTTPS URLs.

## 📞 Support

For any issues or questions:

- **Email**: autohubsolution777@gmail.com
- **Phone/WhatsApp**: +91 9940918442

## 📄 License

Copyright © 2026 AutoHub Solutions. All rights reserved.

## 🙏 Acknowledgments

- Button CSS from [Uiverse.io by zjssun](https://uiverse.io/zjssun)
- Icons from Unicode/SVG
- Fonts: Inter by Google Fonts
- Chatbot: BotPress

---

**Built with ❤️ by AutoHub Solutions**
