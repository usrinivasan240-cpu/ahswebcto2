// ========================================
// MOBILE NAVIGATION
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// PLAN SELECTION FUNCTION
// ========================================
function selectPlan(plan) {
    const contactSection = document.getElementById('contact');
    const planSelect = document.getElementById('plan');

    if (planSelect) {
        planSelect.value = plan;
    }

    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// FORM HANDLING
// ========================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// ========================================
// GOOGLE SHEETS INTEGRATION
// ========================================
// IMPORTANT: You need to create a Google Apps Script Web App to handle form submissions
// Follow these steps to set it up:
//
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1OzdQ-B__cHqbuNp2GTRUxYqxP9t8F1d_SmPeOga1yDo/edit?usp=sharing
//
// 2. Go to Extensions > Apps Script
//
// 3. Delete any existing code and paste this:
//
// function doPost(e) {
//   try {
//     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//     var data = JSON.parse(e.postData.contents);
//
//     // Add new row with timestamp
//     sheet.appendRow([
//       new Date(),
//       data.name,
//       data.businessName,
//       data.phone,
//       data.email,
//       data.requirement,
//       data.plan
//     ]);
//
//     return ContentService
//       .createTextOutput(JSON.stringify({ 'result': 'success' }))
//       .setMimeType(ContentService.MimeType.JSON);
//
//   } catch(error) {
//     return ContentService
//       .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
// }
//
// 4. Save the script
//
// 5. Click Deploy > New Deployment
//
// 6. Click the gear icon > Web App
//
// 7. Configure:
//    - Description: AutoHub Form Handler
//    - Execute as: Me (your email)
//    - Who has access: Anyone
//
// 8. Click Deploy and copy the Web App URL
//
// 9. Replace GOOGLE_SCRIPT_URL below with your actual Web App URL
// ========================================

const GOOGLE_SCRIPT_URL = ''; // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = {
            timestamp: new Date().toISOString(),
            name: document.getElementById('name').value.trim(),
            businessName: document.getElementById('businessName').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            requirement: document.getElementById('requirement').value.trim(),
            plan: document.getElementById('plan').value
        };

        // Check if Google Script URL is configured
        if (!GOOGLE_SCRIPT_URL) {
            // If not configured, simulate success for demo purposes
            console.warn('Google Script URL not configured. Data:', formData);
            console.log('To enable Google Sheets integration:');
            console.log('1. Open script.js');
            console.log('2. Replace GOOGLE_SCRIPT_URL with your Google Apps Script Web App URL');
            console.log('3. Follow the setup instructions in the script comments');

            // Show success message
            showSuccessMessage();
            return;
        }

        try {
            // Send data to Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Show success message
            showSuccessMessage();

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again or contact us directly.');
        } finally {
            submitBtn.textContent = 'Submit Enquiry';
            submitBtn.disabled = false;
        }
    });
}

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const businessName = document.getElementById('businessName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const requirement = document.getElementById('requirement').value.trim();
    const plan = document.getElementById('plan').value;

    // Check required fields
    if (!name) {
        alert('Please enter your name');
        return false;
    }

    if (!businessName) {
        alert('Please enter your business name');
        return false;
    }

    if (!phone) {
        alert('Please enter your phone number');
        return false;
    }

    // Validate phone number format (basic validation for Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }

    if (!email) {
        alert('Please enter your email address');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!requirement) {
        alert('Please describe your automation requirement');
        return false;
    }

    if (!plan) {
        alert('Please select a plan');
        return false;
    }

    return true;
}

// Show success message
function showSuccessMessage() {
    if (contactForm && successMessage) {
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Reset form
function resetForm() {
    if (contactForm && successMessage) {
        contactForm.reset();
        contactForm.style.display = 'block';
        successMessage.style.display = 'none';
    }
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.feature-card, .service-card, .pricing-card, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});
