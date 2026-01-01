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

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5yqGCHcYyQbAa4nyIP37qhmbPXhYCB0X2UPwicLwKbfBWgnwr_1urKKi2P0UumGyF/exec';

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear previous errors
        clearValidationErrors();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Collect and sanitize form data
        const formData = {
            name: sanitizeInput(document.getElementById('name').value.trim()),
            business: sanitizeInput(document.getElementById('businessName').value.trim()),
            phone: sanitizeInput(document.getElementById('phone').value.trim()),
            email: sanitizeInput(document.getElementById('email').value.trim()),
            requirement: sanitizeInput(document.getElementById('requirement').value.trim()),
            plan: document.getElementById('plan').value
        };

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
            
            // Show user-friendly error message
            showErrorMessage('Unable to submit form. Please check your connection and try again, or contact us directly.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

// ========================================
// FORM VALIDATION & SECURITY HELPERS
// ========================================

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    if (!input) return '';
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Clear validation errors
function clearValidationErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
    
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
}

// Show error message for a specific field
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    if (formGroup && !formGroup.querySelector('.error-message')) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        formGroup.classList.add('error');
    }
}

// Show general error message
function showErrorMessage(message) {
    // Remove existing error message if any
    const existingError = document.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.innerHTML = `
        <div class="error-icon">⚠️</div>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="close-error">&times;</button>
    `;
    
    contactForm.parentNode.insertBefore(errorDiv, contactForm);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 10000);
}

// Form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const businessName = document.getElementById('businessName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const requirement = document.getElementById('requirement').value.trim();
    const plan = document.getElementById('plan').value;

    let isValid = true;

    // Check required fields and show specific errors
    if (!name) {
        showFieldError('name', 'Please enter your name');
        isValid = false;
    }

    if (!businessName) {
        showFieldError('businessName', 'Please enter your business name');
        isValid = false;
    }

    if (!phone) {
        showFieldError('phone', 'Please enter your phone number');
        isValid = false;
    } else {
        // Validate phone number format (basic validation for Indian numbers)
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            showFieldError('phone', 'Please enter a valid 10-digit phone number (6-9)xxxxxxxx');
            isValid = false;
        }
    }

    if (!email) {
        showFieldError('email', 'Please enter your email address');
        isValid = false;
    } else {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
    }

    if (!requirement) {
        showFieldError('requirement', 'Please describe your automation requirement');
        isValid = false;
    }

    if (!plan) {
        showFieldError('plan', 'Please select a plan');
        isValid = false;
    }

    // Scroll to first error if validation failed
    if (!isValid) {
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
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
