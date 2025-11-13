// Data storage - array to hold user objects
let users = [];

// DOM elements
const form = document.getElementById('userForm');
const saveBtn = document.getElementById('saveBtn');
const tableBody = document.getElementById('tableBody');
const filterInput = document.getElementById('filterInput');
const themeToggle = document.getElementById('themeToggle');
const saveFeedback = document.getElementById('saveFeedback');

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

// Apply theme and update UI
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    localStorage.setItem('theme', theme);
}

// Toggle between light and dark themes
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Validate form inputs
function validateForm() {
    const requiredFields = ['idNumber', 'firstName', 'lastName', 'gender', 'birthday'];
    let isValid = true;

    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        if (!field.value.trim()) {
            formGroup.classList.add('error');
            isValid = false;
        } else {
            formGroup.classList.remove('error');
        }
    });

    return isValid;
}

// Add user function - handles form submission
function addUser(evt) {
    evt.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    // Get form data and trim whitespace
    const formData = new FormData(form);
    const newUser = {
        idNumber: formData.get('idNumber').trim(),
        firstName: formData.get('firstName').trim(),
        middleName: formData.get('middleName').trim(),
        lastName: formData.get('lastName').trim(),
        gender: formData.get('gender'),
        birthday: formData.get('birthday')
    };

    // Add to users array
    users.push(newUser);
    
    // Update table display
    renderTable();
    
    // Reset form
    resetForm();
    
    // Show save feedback
    showSaveFeedback();
}

// Reset form to initial state
function resetForm() {
    form.reset();
    
    // Remove any error states
    document.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
    });
    
    // Focus first input
    document.getElementById('idNumber').focus();
}

// Show save confirmation feedback
function showSaveFeedback() {
    saveFeedback.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        saveFeedback.classList.remove('show');
    }, 3000);
}

// Filter users based on search query
function filterUsers(query) {
    if (!query.trim()) {
        return users;
    }
    
    const searchTerm = query.toLowerCase().trim();
    return users.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
    );
}

// Render table with current users (applying filter if active)
function renderTable() {
    const filterQuery = filterInput.value;
    const filteredUsers = filterUsers(filterQuery);
    
    if (filteredUsers.length === 0) {
        const emptyMessage = filterQuery ? 
            `No users found matching "${filterQuery}"` : 
            'No users registered yet. Add your first user!';
            
        tableBody.innerHTML = `
            <tr class="empty-state">
                <td colspan="6">${emptyMessage}</td>
            </tr>
        `;
        return;
    }

    // Build table rows
    const rows = filteredUsers.map(user => `
        <tr>
            <td>${user.idNumber}</td>
            <td>${user.firstName}</td>
            <td>${user.middleName || '-'}</td>
            <td>${user.lastName}</td>
            <td>${user.gender}</td>
            <td>${user.birthday}</td>
        </tr>
    `).join('');

    tableBody.innerHTML = rows;
}

// Event listeners
form.addEventListener('submit', addUser);
filterInput.addEventListener('input', renderTable);
themeToggle.addEventListener('click', toggleTheme);

// Add input event listeners for real-time validation clearing
document.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('input', function() {
        if (this.value.trim()) {
            this.closest('.form-group').classList.remove('error');
        }
    });
});

// Initialize the page
initializeTheme();
document.getElementById('idNumber').focus();
