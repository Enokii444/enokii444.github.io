// ==========================================
// ARTVISTA - ONLINE ART CATALOG JAVASCRIPT
// Clean Implementation - Web Development Final Project
// ==========================================

/**
 * DOM Content Loaded Event Listener
 * Initializes all JavaScript functionality when the page is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeDynamicContent();
    initializeFormValidation();
    initializeGalleryFilters();
    
    // Fix layout on load
    fixLayoutOnLoad();
    
    console.log('🎨 ArtVista initialized successfully!');
});

// ==========================================
// LAYOUT FIXES
// ==========================================

/**
 * Fix layout alignment on page load
 * Addresses the centering issue on first load
 */
function fixLayoutOnLoad() {
    // Force recalculation after a brief delay to ensure proper centering
    setTimeout(function() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.opacity = '1';
        }
    }, 100);
}

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

/**
 * Initialize responsive navigation menu toggle
 * Requirement: Interactive button or menu toggle (F3-F4)
 */
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navbarNav = document.getElementById('navbarNav');
    
    if (navToggle && navbarNav) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded attribute
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle navbar collapse
            navbarNav.classList.toggle('show');
            
            console.log('📱 Mobile menu toggled');
        });
        
        // Close mobile menu when clicking nav links
        const navLinks = navbarNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991) { // Bootstrap lg breakpoint
                    navbarNav.classList.remove('show');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarNav.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navbarNav.classList.contains('show')) {
                navbarNav.classList.remove('show');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ==========================================
// DYNAMIC CONTENT FUNCTIONALITY
// ==========================================

/**
 * Initialize dynamic greeting and date display
 * Requirement: Dynamic content (date/time, greeting, etc.) (F3-F4)
 */
function initializeDynamicContent() {
    updateGreeting();
    updateCurrentDate();
}

/**
 * Update greeting based on current time
 */
function updateGreeting() {
    const greetingContainer = document.getElementById('greeting-container');
    
    if (greetingContainer) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        let greeting = '';
        let emoji = '';
        
        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Good Morning';
            emoji = '🌅';
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = 'Good Afternoon';
            emoji = '☀️';
        } else {
            greeting = 'Good Evening';
            emoji = '🌙';
        }
        
        greetingContainer.innerHTML = `
            <div class="dynamic-greeting">
                ${emoji} ${greeting}, art lover!
            </div>
        `;
        
        console.log(`👋 Greeting updated: ${greeting}`);
    }
}

/**
 * Update current date display
 */
function updateCurrentDate() {
    const dateContainer = document.getElementById('date-container');
    
    if (dateContainer) {
        const currentDate = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        dateContainer.innerHTML = `
            <div class="dynamic-date">
                📅 Today is ${formattedDate}
            </div>
        `;
        
        console.log(`📅 Date updated: ${formattedDate}`);
    }
}

// ==========================================
// FORM VALIDATION FUNCTIONALITY
// ==========================================

/**
 * Initialize form validation
 * Requirement: Form validation (Signup page) (F3-F4)
 */
function initializeFormValidation() {
    initializeSignupValidation();
    initializeLoginValidation();
}

/**
 * Initialize signup form validation
 */
function initializeSignupValidation() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const isValid = validateSignupForm();
            
            if (isValid) {
                showSuccessMessage();
                console.log('✅ Signup form validation passed');
            } else {
                console.log('❌ Signup form validation failed');
            }
        });
        
        // Real-time validation
        const inputs = signupForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateSignupField(input);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(input);
            });
        });
    }
}

/**
 * Validate entire signup form
 */
function validateSignupForm() {
    const errors = [];
    let isValid = true;
    
    // Clear previous errors
    hideErrorMessages();
    clearAllFieldErrors();
    
    // Get form fields
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsCheckbox');
    
    // Validate each field
    if (!firstName || !firstName.value.trim()) {
        errors.push('First name is required');
        if (firstName) showFieldError(firstName, 'Please enter your first name');
        isValid = false;
    }
    
    if (!lastName || !lastName.value.trim()) {
        errors.push('Last name is required');
        if (lastName) showFieldError(lastName, 'Please enter your last name');
        isValid = false;
    }
    
    if (!email || !email.value.trim()) {
        errors.push('Email address is required');
        if (email) showFieldError(email, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        errors.push('Please enter a valid email address');
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!username || !username.value.trim()) {
        errors.push('Username is required');
        if (username) showFieldError(username, 'Please choose a username');
        isValid = false;
    } else if (username.value.length < 3) {
        errors.push('Username must be at least 3 characters long');
        showFieldError(username, 'Username must be at least 3 characters long');
        isValid = false;
    }
    
    if (!password || !password.value) {
        errors.push('Password is required');
        if (password) showFieldError(password, 'Please create a password');
        isValid = false;
    } else if (password.value.length < 8) {
        errors.push('Password must be at least 8 characters long');
        showFieldError(password, 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    if (!confirmPassword || !confirmPassword.value) {
        errors.push('Please confirm your password');
        if (confirmPassword) showFieldError(confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (password && password.value !== confirmPassword.value) {
        errors.push('Passwords do not match');
        showFieldError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    if (!termsCheckbox || !termsCheckbox.checked) {
        errors.push('You must agree to the Terms & Conditions');
        if (termsCheckbox) showFieldError(termsCheckbox, 'You must agree to the Terms & Conditions');
        isValid = false;
    }
    
    // Show errors if any
    if (!isValid) {
        showErrorMessages(errors);
    }
    
    return isValid;
}

/**
 * Validate individual signup field
 */
function validateSignupField(field) {
    if (!field) return;
    
    const fieldId = field.id;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    switch (fieldId) {
        case 'firstName':
        case 'lastName':
            if (!value) {
                showFieldError(field, `Please enter your ${fieldId === 'firstName' ? 'first' : 'last'} name`);
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(field, 'Please enter your email address');
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
            
        case 'username':
            if (!value) {
                showFieldError(field, 'Please choose a username');
            } else if (value.length < 3) {
                showFieldError(field, 'Username must be at least 3 characters long');
            }
            break;
            
        case 'password':
            if (!value) {
                showFieldError(field, 'Please create a password');
            } else if (value.length < 8) {
                showFieldError(field, 'Password must be at least 8 characters long');
            }
            break;
            
        case 'confirmPassword':
            const passwordField = document.getElementById('password');
            const password = passwordField ? passwordField.value : '';
            if (!value) {
                showFieldError(field, 'Please confirm your password');
            } else if (password !== value) {
                showFieldError(field, 'Passwords do not match');
            }
            break;
    }
}

/**
 * Initialize login form validation
 */
function initializeLoginValidation() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const isValid = validateLoginForm();
            
            if (isValid) {
                showLoginSuccessMessage();
                console.log('✅ Login form validation passed');
            } else {
                console.log('❌ Login form validation failed');
            }
        });
    }
}

/**
 * Validate login form
 */
function validateLoginForm() {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const errors = [];
    let isValid = true;
    
    // Clear previous errors
    hideLoginErrorMessages();
    clearAllFieldErrors();
    
    // Validate email/username
    if (!loginEmail || !loginEmail.value.trim()) {
        errors.push('Username or email is required');
        if (loginEmail) showFieldError(loginEmail, 'Please enter your username or email');
        isValid = false;
    }
    
    // Validate password
    if (!loginPassword || !loginPassword.value) {
        errors.push('Password is required');
        if (loginPassword) showFieldError(loginPassword, 'Please enter your password');
        isValid = false;
    }
    
    // Show errors if any
    if (!isValid) {
        showLoginErrorMessages(errors);
    }
    
    return isValid;
}

// ==========================================
// GALLERY FILTER FUNCTIONALITY
// ==========================================

/**
 * Initialize gallery filter functionality
 */
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter artworks
                filterArtworks(filter);
                
                console.log(`🎨 Gallery filtered by: ${filter}`);
            });
        });
    }
}

/**
 * Filter artworks based on selected category
 */
function filterArtworks(filter) {
    const artworkItems = document.querySelectorAll('.artwork-item');
    const noResultsMessage = document.getElementById('noResults');
    let visibleCount = 0;
    
    artworkItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        
        if (filter === 'all' || (categories && categories.includes(filter))) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Show/hide no results message
    if (noResultsMessage) {
        if (visibleCount === 0) {
            noResultsMessage.classList.remove('d-none');
        } else {
            noResultsMessage.classList.add('d-none');
        }
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    if (!field) return;
    
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    if (!field) return;
    
    field.classList.remove('is-invalid');
    
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = '';
    }
}

/**
 * Clear all field errors
 */
function clearAllFieldErrors() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => {
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
    });
}

/**
 * Show error messages
 */
function showErrorMessages(errors) {
    const errorContainer = document.getElementById('error-messages');
    const errorList = document.getElementById('error-list');
    
    if (errorContainer && errorList) {
        errorList.innerHTML = '';
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        
        errorContainer.classList.remove('d-none');
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Hide error messages
 */
function hideErrorMessages() {
    const errorContainer = document.getElementById('error-messages');
    if (errorContainer) {
        errorContainer.classList.add('d-none');
    }
}

/**
 * Show login error messages
 */
function showLoginErrorMessages(errors) {
    const errorContainer = document.getElementById('login-error-messages');
    const errorList = document.getElementById('login-error-list');
    
    if (errorContainer && errorList) {
        errorList.innerHTML = '';
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        
        errorContainer.classList.remove('d-none');
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Hide login error messages
 */
function hideLoginErrorMessages() {
    const errorContainer = document.getElementById('login-error-messages');
    if (errorContainer) {
        errorContainer.classList.add('d-none');
    }
}

/**
 * Show success message for signup
 */
function showSuccessMessage() {
    const successContainer = document.getElementById('success-message');
    const form = document.getElementById('signupForm');
    
    if (successContainer) {
        hideErrorMessages();
        successContainer.classList.remove('d-none');
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form
        if (form) {
            form.reset();
            clearAllFieldErrors();
        }
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            successContainer.classList.add('d-none');
        }, 5000);
    }
}

/**
 * Show success message for login
 */
function showLoginSuccessMessage() {
    const successContainer = document.getElementById('login-success-message');
    const form = document.getElementById('loginForm');
    
    if (successContainer) {
        hideLoginErrorMessages();
        successContainer.classList.remove('d-none');
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form
        if (form) {
            form.reset();
            clearAllFieldErrors();
        }
        
        // Auto-hide success message and simulate redirect
        setTimeout(() => {
            successContainer.classList.add('d-none');
            console.log('🔄 Login successful - redirecting...');
        }, 2000);
    }
}

// ==========================================
// ERROR HANDLING
// ==========================================

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('🚨 JavaScript Error:', event.error);
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);
    event.preventDefault();
});

// ==========================================
// CONSOLE WELCOME MESSAGE
// ==========================================

console.log(`
🎨 ArtVista Online Art Catalog
------------------------------
Clean, centered, responsive design
Features:
✅ Mobile-responsive navigation
✅ Dynamic greeting & date  
✅ Form validation
✅ Gallery filtering
✅ Accessibility optimized
------------------------------
Final Project - Web Development Course
`);

// Ensure layout is properly initialized
window.addEventListener('load', function() {
    fixLayoutOnLoad();
});

// ==========================================
// DYNAMIC CONTENT FUNCTIONALITY
// ==========================================

/**
 * Initialize dynamic greeting and date display
 * Requirement: Dynamic content (date/time, greeting, etc.) (F3-F4)
 */
function initializeDynamicContent() {
    updateGreeting();
    updateCurrentDate();
    
    console.log('🕐 Dynamic content initialized');
}

/**
 * Update greeting based on current time
 */
function updateGreeting() {
    const greetingContainer = document.getElementById('greeting-container');
    
    if (greetingContainer) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        let greeting = '';
        let emoji = '';
        
        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Good Morning';
            emoji = '🌅';
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = 'Good Afternoon';
            emoji = '☀️';
        } else {
            greeting = 'Good Evening';
            emoji = '🌙';
        }
        
        greetingContainer.innerHTML = `
            <div class="dynamic-greeting">
                ${emoji} ${greeting}, art lover!
            </div>
        `;
        
        console.log(`👋 Greeting updated: ${greeting}`);
    }
}

/**
 * Update current date display
 */
function updateCurrentDate() {
    const dateContainer = document.getElementById('date-container');
    
    if (dateContainer) {
        const currentDate = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        dateContainer.innerHTML = `
            <div class="dynamic-date">
                📅 Today is ${formattedDate}
            </div>
        `;
        
        console.log(`📅 Date updated: ${formattedDate}`);
    }
}

// ==========================================
// FORM VALIDATION FUNCTIONALITY
// ==========================================

/**
 * Initialize form validation
 * Requirement: Form validation (Signup page) (F3-F4)
 */
function initializeFormValidation() {
    initializeSignupValidation();
    initializeLoginValidation();
}

/**
 * Initialize signup form validation
 */
function initializeSignupValidation() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const isValid = validateSignupForm();
            
            if (isValid) {
                showSuccessMessage();
                console.log('✅ Signup form validation passed');
            } else {
                console.log('❌ Signup form validation failed');
            }
        });
        
        // Real-time validation
        const inputs = signupForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateSignupField(input);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(input);
            });
        });
    }
}

/**
 * Validate entire signup form
 */
function validateSignupForm() {
    const form = document.getElementById('signupForm');
    const errors = [];
    let isValid = true;
    
    // Clear previous errors
    hideErrorMessages();
    clearAllFieldErrors();
    
    // Validate each field
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsCheckbox');
    
    // First Name validation
    if (!firstName.value.trim()) {
        errors.push('First name is required');
        showFieldError(firstName, 'Please enter your first name');
        isValid = false;
    }
    
    // Last Name validation
    if (!lastName.value.trim()) {
        errors.push('Last name is required');
        showFieldError(lastName, 'Please enter your last name');
        isValid = false;
    }
    
    // Email validation
    if (!email.value.trim()) {
        errors.push('Email address is required');
        showFieldError(email, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        errors.push('Please enter a valid email address');
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Username validation
    if (!username.value.trim()) {
        errors.push('Username is required');
        showFieldError(username, 'Please choose a username');
        isValid = false;
    } else if (username.value.length < 3) {
        errors.push('Username must be at least 3 characters long');
        showFieldError(username, 'Username must be at least 3 characters long');
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
        errors.push('Username can only contain letters, numbers, and underscores');
        showFieldError(username, 'Username can only contain letters, numbers, and underscores');
        isValid = false;
    }
    
    // Password validation
    if (!password.value) {
        errors.push('Password is required');
        showFieldError(password, 'Please create a password');
        isValid = false;
    } else if (password.value.length < 8) {
        errors.push('Password must be at least 8 characters long');
        showFieldError(password, 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    // Confirm Password validation
    if (!confirmPassword.value) {
        errors.push('Please confirm your password');
        showFieldError(confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        errors.push('Passwords do not match');
        showFieldError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    // Terms checkbox validation
    if (!termsCheckbox.checked) {
        errors.push('You must agree to the Terms & Conditions');
        showFieldError(termsCheckbox, 'You must agree to the Terms & Conditions');
        isValid = false;
    }
    
    // Show errors if any
    if (!isValid) {
        showErrorMessages(errors);
    }
    
    return isValid;
}

/**
 * Validate individual signup field
 */
function validateSignupField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    switch (fieldId) {
        case 'firstName':
        case 'lastName':
            if (!value) {
                showFieldError(field, `Please enter your ${fieldId === 'firstName' ? 'first' : 'last'} name`);
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(field, 'Please enter your email address');
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
            
        case 'username':
            if (!value) {
                showFieldError(field, 'Please choose a username');
            } else if (value.length < 3) {
                showFieldError(field, 'Username must be at least 3 characters long');
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                showFieldError(field, 'Username can only contain letters, numbers, and underscores');
            }
            break;
            
        case 'password':
            if (!value) {
                showFieldError(field, 'Please create a password');
            } else if (value.length < 8) {
                showFieldError(field, 'Password must be at least 8 characters long');
            }
            break;
            
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (!value) {
                showFieldError(field, 'Please confirm your password');
            } else if (password !== value) {
                showFieldError(field, 'Passwords do not match');
            }
            break;
    }
}

/**
 * Initialize login form validation
 */
function initializeLoginValidation() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const isValid = validateLoginForm();
            
            if (isValid) {
                showLoginSuccessMessage();
                console.log('✅ Login form validation passed');
            } else {
                console.log('❌ Login form validation failed');
            }
        });
    }
}

/**
 * Validate login form
 */
function validateLoginForm() {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const errors = [];
    let isValid = true;
    
    // Clear previous errors
    hideLoginErrorMessages();
    clearAllFieldErrors();
    
    // Validate email/username
    if (!loginEmail.value.trim()) {
        errors.push('Username or email is required');
        showFieldError(loginEmail, 'Please enter your username or email');
        isValid = false;
    }
    
    // Validate password
    if (!loginPassword.value) {
        errors.push('Password is required');
        showFieldError(loginPassword, 'Please enter your password');
        isValid = false;
    }
    
    // Show errors if any
    if (!isValid) {
        showLoginErrorMessages(errors);
    }
    
    return isValid;
}

// ==========================================
// GALLERY FILTER FUNCTIONALITY
// ==========================================

/**
 * Initialize gallery filter functionality
 */
function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter artworks
                filterArtworks(filter);
                
                console.log(`🎨 Gallery filtered by: ${filter}`);
            });
        });
    }
}

/**
 * Filter artworks based on selected category
 */
function filterArtworks(filter) {
    const artworkItems = document.querySelectorAll('.artwork-item');
    const noResultsMessage = document.getElementById('noResults');
    let visibleCount = 0;
    
    artworkItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        
        if (filter === 'all' || categories.includes(filter)) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Show/hide no results message
    if (noResultsMessage) {
        if (visibleCount === 0) {
            noResultsMessage.classList.remove('d-none');
        } else {
            noResultsMessage.classList.add('d-none');
        }
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = '';
    }
}

/**
 * Clear all field errors
 */
function clearAllFieldErrors() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => {
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
    });
}

/**
 * Show error messages
 */
function showErrorMessages(errors) {
    const errorContainer = document.getElementById('error-messages');
    const errorList = document.getElementById('error-list');
    
    if (errorContainer && errorList) {
        errorList.innerHTML = '';
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        
        errorContainer.classList.remove('d-none');
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Hide error messages
 */
function hideErrorMessages() {
    const errorContainer = document.getElementById('error-messages');
    if (errorContainer) {
        errorContainer.classList.add('d-none');
    }
}

/**
 * Show login error messages
 */
function showLoginErrorMessages(errors) {
    const errorContainer = document.getElementById('login-error-messages');
    const errorList = document.getElementById('login-error-list');
    
    if (errorContainer && errorList) {
        errorList.innerHTML = '';
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        
        errorContainer.classList.remove('d-none');
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Hide login error messages
 */
function hideLoginErrorMessages() {
    const errorContainer = document.getElementById('login-error-messages');
    if (errorContainer) {
        errorContainer.classList.add('d-none');
    }
}

/**
 * Show success message for signup
 */
function showSuccessMessage() {
    const successContainer = document.getElementById('success-message');
    const form = document.getElementById('signupForm');
    
    if (successContainer) {
        hideErrorMessages();
        successContainer.classList.remove('d-none');
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form
        if (form) {
            form.reset();
            clearAllFieldErrors();
        }
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            successContainer.classList.add('d-none');
        }, 5000);
    }
}

/**
 * Show success message for login
 */
function showLoginSuccessMessage() {
    const successContainer = document.getElementById('login-success-message');
    const form = document.getElementById('loginForm');
    
    if (successContainer) {
        hideLoginErrorMessages();
        successContainer.classList.remove('d-none');
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form
        if (form) {
            form.reset();
            clearAllFieldErrors();
        }
        
        // Auto-hide success message and simulate redirect
        setTimeout(() => {
            successContainer.classList.add('d-none');
            // Simulate redirect to gallery (for demo purposes)
            console.log('🔄 Redirecting to gallery...');
        }, 2000);
    }
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, wait) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

/**
 * Handle keyboard navigation
 */
document.addEventListener('keydown', function(event) {
    // Close mobile menu with Escape key
    if (event.key === 'Escape') {
        const navbarNav = document.getElementById('navbarNav');
        const navToggle = document.getElementById('navToggle');
        
        if (navbarNav && navbarNav.classList.contains('show')) {
            navbarNav.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    }
});

// ==========================================
// ERROR HANDLING
// ==========================================

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('🚨 JavaScript Error:', event.error);
    // In a production environment, you might want to send this to a logging service
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);
    // Prevent the default browser behavior
    event.preventDefault();
});

// ==========================================
// CONSOLE WELCOME MESSAGE
// ==========================================

console.log(`
🎨 Welcome to ArtVista Online Art Catalog!
-----------------------------------------
Final Project for Web Development Course
Features implemented:
✅ Responsive Navigation with Mobile Toggle
✅ Dynamic Greeting based on Time of Day  
✅ Current Date Display
✅ Complete Form Validation (Signup & Login)
✅ Gallery Filter System
✅ Accessibility Features
✅ Performance Optimizations
-----------------------------------------
Happy coding! 🚀
`);