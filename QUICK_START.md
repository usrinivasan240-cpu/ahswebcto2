# ⚡ Quick Start Guide - AutoHub Solutions Website

This guide will help you get your website live in less than 15 minutes!

## 🎯 What You Have

A complete, production-ready website with:
- ✅ Professional design (Black + Blue theme)
- ✅ All 6 sections (Home, About, Services, Pricing, Why Automation, Contact)
- ✅ Working contact form
- ✅ Google Sheets integration ready
- ✅ BotPress chatbot embedded
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ SEO optimized

## 📋 Step 1: Set Up Google Sheets (5 minutes)

This is the ONLY setup required to make the contact form work.

### A. Open Your Google Sheet
Go to: https://docs.google.com/spreadsheets/d/1OzdQ-B__cHqbuNp2GTRUxYqxP9t8F1d_SmPeOga1yDo/edit?usp=sharing

### B. Add the Script
1. Click **Extensions** > **Apps Script**
2. Delete any code you see
3. Copy everything from the file `GOOGLE_APPS_SCRIPT.js` in this project
4. Paste it into the Apps Script editor
5. Press **Ctrl+S** (or **Cmd+S** on Mac) to save

### C. Deploy the Script
1. Click **Deploy** (blue button, top right)
2. Click **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Fill in:
   - **Description**: AutoHub Form Handler
   - **Execute as**: Me (your email) ⚠️ IMPORTANT!
   - **Who has access**: **Anyone** ⚠️ CRITICAL!
6. Click **Deploy**
7. **COPY the Web App URL** (it starts with https://script.google.com/macros/s/...)

### D. Update Your Website
1. Open the file `script.js` in your project
2. Find this line (around line 25):
   ```javascript
   const GOOGLE_SCRIPT_URL = '';
   ```
3. Replace it with:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   ```
4. Replace the URL above with the one you copied
5. Save the file

## 🚀 Step 2: Deploy Your Website (5 minutes)

Choose ONE of these options:

### Option A: GitHub Pages (Recommended - Free)

1. **Create a GitHub repository**
   - Go to https://github.com/new
   - Name it: `autohub-website`
   - Make it Public or Private (doesn't matter)
   - Click **Create repository**

2. **Upload your files**
   - In your terminal, run:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - AutoHub website"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/autohub-website.git
     git push -u origin main
     ```
   - Replace `YOUR_USERNAME` with your actual GitHub username

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** (top menu)
   - Click **Pages** (left menu)
   - Under "Source", select **main** branch
   - Click **Save**

4. **Your website is live!**
   - Wait 1-2 minutes
   - Visit: `https://YOUR_USERNAME.github.io/autohub-website/`

### Option B: Netlify (Easiest - Drag & Drop)

1. Go to https://netlify.com
2. Sign up (free) or login
3. Drag this entire project folder into the Netlify dashboard
4. Your website is live instantly!
5. Netlify will give you a URL like: `https://amazing-name-12345.netlify.app`

### Option C: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize:
   ```bash
   firebase init
   ```
   - Select: **Hosting**
   - Select: Use an existing project (or create new)
   - Public directory: `.` (current directory)
   - Configure as single-page app: **Yes**
   - Set up automatic builds: **No**

4. Deploy:
   ```bash
   firebase deploy
   ```

## ✅ Step 3: Test Your Website (5 minutes)

1. **Visit your deployed website URL**
2. **Test on desktop** - resize browser window
3. **Test on mobile** - use browser dev tools (F12) → Device Toolbar
4. **Test the contact form**:
   - Fill out all fields
   - Click "Submit Enquiry"
   - Check your Google Sheet - new row should appear!
5. **Test the chatbot** - click the chat button and try it

## 🎉 You're Done!

Your AutoHub Solutions website is now live and functional!

### Your Website Includes:
- ✅ Hero section with "Never Miss a Message Again"
- ✅ About Us with company info
- ✅ Services section (all 5 services)
- ✅ Pricing section (all 4 plans)
- ✅ Why Automation section (all 5 benefits)
- ✅ Contact form that saves to Google Sheets
- ✅ BotPress chatbot
- ✅ Footer with all contact info
- ✅ Social media links
- ✅ Copyright 2026

## 📞 Need Help?

If you have any issues:

- **Email**: autohubsolution777@gmail.com
- **Phone/WhatsApp**: +91 9940918442

## 🔧 Customization Tips

### Change Colors
Edit `styles.css` and find:
```css
:root {
    --accent-blue: #008cff;  /* Change this */
}
```

### Update Contact Info
Edit `index.html` and search for contact information in the footer.

### Update Pricing
Edit the pricing section in `index.html`.

### Change Chatbot
Get your own BotPress chatbot and replace the URL in `index.html` (bottom of file, before closing body tag).

## 📚 Additional Documentation

- **README.md** - Complete documentation
- **DEPLOYMENT_CHECKLIST.md** - Detailed deployment checklist
- **GOOGLE_APPS_SCRIPT.js** - Google Sheets integration code

---

**Built with ❤️ for AutoHub Solutions**
**Copyright © 2026**
