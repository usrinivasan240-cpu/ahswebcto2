# 🧪 Local Testing Guide - AutoHub Solutions

This guide will help you test the website locally before deploying.

## Option 1: Open Directly in Browser (Easiest)

### For Windows/Mac/Linux:

1. Navigate to the project folder in your file explorer
2. Double-click `index.html`
3. The website will open in your default browser

**Note**: This works for most features, but some features (like fetch requests) may have CORS issues when opening files directly.

---

## Option 2: Python HTTP Server (Recommended)

### Step 1: Check if Python is installed

**Windows:**
```cmd
python --version
```

**Mac/Linux:**
```bash
python3 --version
```

If you don't have Python, download it from: https://www.python.org/downloads/

### Step 2: Start the server

**Windows:**
```cmd
python -m http.server 8000
```

**Mac/Linux:**
```bash
python3 -m http.server 8000
```

### Step 3: Open your browser

Visit: http://localhost:8000

### Step 4: Stop the server when done

Press `Ctrl+C` in the terminal

---

## Option 3: Node.js HTTP Server

### Step 1: Check if Node.js is installed

```bash
node --version
```

If not installed, download from: https://nodejs.org/

### Step 2: Install http-server (one-time setup)

```bash
npm install -g http-server
```

### Step 3: Start the server

Navigate to your project folder and run:

```bash
http-server -p 8000
```

### Step 4: Open your browser

Visit: http://localhost:8000

---

## 📋 Testing Checklist

### ✅ Visual Testing
- [ ] Page loads correctly
- [ ] All sections display properly
- [ ] Colors match the design (Black + Blue)
- [ ] Text is readable
- [ ] No broken layout elements

### ✅ Navigation Testing
- [ ] Clicking navigation links scrolls smoothly
- [ ] "Get Free Demo" button scrolls to contact section
- [ ] "Contact Us" button scrolls to contact section
- [ ] Mobile hamburger menu opens/closes correctly
- [ ] All menu items work on mobile

### ✅ Responsive Testing
- [ ] Resize browser to test desktop (1200px+)
- [ ] Resize browser to test tablet (768px-1199px)
- [ ] Resize browser to test mobile (<768px)
- [ ] Use browser DevTools (F12 → Device Toolbar) for mobile testing

### ✅ Form Testing
- [ ] Try submitting empty form → Should show validation errors
- [ ] Fill only some fields → Should show missing field errors
- [ ] Enter invalid email → Should show email validation error
- [ ] Enter invalid phone → Should show phone validation error
- [ ] Fill all fields correctly → Form should submit
- [ ] Success message should appear
- [ ] Page should NOT refresh

### ✅ Pricing Buttons
- [ ] Click "Choose Demo" → Should select "Demo" in form
- [ ] Click "Choose Basic" → Should select "Basic" in form
- [ ] Click "Choose Standard" → Should select "Standard" in form
- [ ] Click "Contact Us" → Should select "Custom" in form
- [ ] All should scroll to contact section

### ✅ Chatbot Testing
- [ ] Chatbot button appears on screen (usually bottom-right)
- [ ] Chatbot opens when clicked
- [ ] Can type and send messages
- [ ] Chatbot responds

### ✅ Footer Testing
- [ ] Contact email is correct
- [ ] Phone number is correct
- [ ] Business hours are correct
- [ ] Location is correct
- [ ] Social media links work (click to test)
- [ ] Copyright shows "© 2026 AutoHub Solutions"

### ✅ Animations Testing
- [ ] Scroll down the page
- [ ] Cards fade in as they appear
- [ ] Buttons have hover effect (glowing blue)
- [ ] Page scrolls smoothly when clicking links

---

## 🐛 Troubleshooting

### Problem: Page doesn't load

**Solution**:
- Make sure you're in the correct folder
- Check that `index.html` exists
- Try opening directly by double-clicking `index.html`

### Problem: Styles not loading

**Solution**:
- Ensure `styles.css` is in the same folder as `index.html`
- Check browser DevTools (F12) → Network tab for errors
- Clear browser cache (Ctrl+Shift+Delete)

### Problem: JavaScript not working

**Solution**:
- Ensure `script.js` is in the same folder
- Check browser console (F12) for errors
- Make sure no other extensions are interfering

### Problem: Form submission fails

**Solution**:
- This is expected if GOOGLE_SCRIPT_URL is not set yet
- Check browser console for error messages
- See QUICK_START.md for Google Sheets setup

### Problem: Chatbot not showing

**Solution**:
- Check internet connection (chatbot loads from external CDN)
- Check browser console for BotPress errors
- Verify the chatbot URL is correct in `index.html`

### Problem: Mobile menu not working

**Solution**:
- Check if `script.js` is loaded
- Ensure JavaScript is enabled in browser
- Test in different browser

---

## 📱 Browser Testing

Test in multiple browsers:

### Recommended Browsers
- ✅ Google Chrome
- ✅ Firefox
- ✅ Safari (Mac/iOS)
- ✅ Edge (Windows)

### How to Test
1. Open website in each browser
2. Run through all items in the Testing Checklist above
3. Note any browser-specific issues

---

## 🔍 Using Browser DevTools

### Open DevTools
- **Windows/Linux**: F12 or Ctrl+Shift+I
- **Mac**: Cmd+Option+I

### Useful Tabs

#### Console Tab
- Shows JavaScript errors
- Useful for debugging script issues

#### Network Tab
- Shows all loaded resources
- Check if CSS/JS files loaded
- See form submission requests

#### Elements Tab
- Inspect HTML structure
- View applied CSS
- Test responsive design

#### Device Toolbar
- Click phone/tablet icon (or Ctrl+Shift+M)
- Test different device sizes
- Simulate touch events

---

## 🎯 Next Steps After Testing

Once you've tested everything:

1. **Set up Google Sheets** (see QUICK_START.md)
2. **Deploy your website** (see DEPLOYMENT_CHECKLIST.md)
3. **Test on live URL**
4. **Share with stakeholders**

---

## 📞 Need Help?

If you encounter issues:
- **Email**: autohubsolution777@gmail.com
- **Phone/WhatsApp**: +91 9940918442

---

**Happy Testing! 🚀**
