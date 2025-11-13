# 🎨 ArtVista - Online Art Catalog

**Final Project for Web Development Course**

A modern, responsive online art catalog website showcasing digital illustrations, traditional artwork, and graphic design pieces. Built with HTML5, CSS3, JavaScript, and Bootstrap framework.

## 📋 Project Overview

ArtVista is a comprehensive web application that demonstrates the integration of all concepts learned throughout the Web Development course (F1–F7). It serves as an online platform for showcasing and discovering artistic works while providing an interactive user experience.

### 🎯 Project Requirements Met

- ✅ **HTML & CSS (F1–F2)**: Multi-page responsive website with semantic HTML
- ✅ **JavaScript (F3–F4)**: Interactive features including form validation and dynamic content
- ✅ **Web Technologies (F5)**: Design principles and SEO optimization
- ✅ **Version Control (F6)**: Git repository with meaningful commits and branching
- ✅ **Deployment (F7)**: Ready for deployment to GitHub Pages/Netlify/Vercel

## 🌟 Features

### Core Functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**: Mobile-friendly hamburger menu with smooth transitions
- **Dynamic Content**: Time-based greetings and real-time date display
- **Advanced Form Validation**: Client-side validation for signup and login forms
- **Gallery Filtering**: Interactive filtering system for artwork categories
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### Pages Included
1. **Home (Dashboard)** - Latest collections and featured artworks
2. **Gallery** - Complete art catalog with filtering capabilities
3. **About** - Information about the catalog and curator
4. **Signup** - User registration with comprehensive validation
5. **Login** - User authentication interface

## 🛠 Technologies Used

- **HTML5**: Semantic markup with proper document structure
- **CSS3**: Modern styling with custom properties, flexbox, and grid
- **JavaScript (ES6+)**: Interactive functionality and form validation
- **Bootstrap 5**: Responsive framework and UI components
- **Git**: Version control and project management

## 📁 Project Structure

```
FINAL PROJECT/
├── index.html              # Homepage/Dashboard
├── gallery.html            # Art Collection Gallery
├── about.html              # About Page
├── signup.html             # User Registration
├── login.html              # User Login
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── img/                    # Images and assets
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript
- Git installed (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/artvista-art-catalog.git
   cd artvista-art-catalog
   ```

2. **Open in web browser**
   ```bash
   # Option 1: Direct file opening
   open index.html

   # Option 2: Using a local server (recommended)
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **For development**
   ```bash
   # Open in your preferred code editor
   code .
   ```

## 📊 Git Workflow

### Basic Git Commands Used

```bash
# Initialize repository
git init

# Add files to staging
git add .

# Commit changes with meaningful messages
git commit -m "Initial commit: Add basic HTML structure"
git commit -m "Feature: Add form validation functionality"
git commit -m "Style: Implement responsive design for mobile devices"
git commit -m "Fix: Resolve navigation menu toggle issue"

# Create feature branch
git checkout -b feature-gallery-filters

# Work on feature, then merge back to main
git checkout main
git merge feature-gallery-filters

# Check status and history
git status
git log --oneline
```

### Commit Message Guidelines
- **feat**: New feature implementation
- **fix**: Bug fix
- **style**: CSS/styling changes
- **docs**: Documentation updates
- **refactor**: Code refactoring without feature changes

## 🌐 Deployment Options

### Option 1: GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (main)
4. Access via: `https://yourusername.github.io/artvista-art-catalog/`

### Option 2: Netlify
1. Create account at [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Auto-deploy on every push to main branch
4. Custom domain available

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow setup prompts
4. Automatic deployments from Git

## 🎨 Design Principles Applied

### Contrast
- High contrast text on backgrounds for readability
- Clear visual hierarchy with typography scales
- Color-coded categories and status indicators

### Alignment
- Consistent grid system throughout all pages
- Center-aligned hero content with left-aligned text blocks
- Proper form field alignment and spacing

### Repetition
- Consistent button styles across all pages
- Uniform card designs for artwork displays
- Repeated color scheme and typography patterns

### Proximity
- Grouped related form elements together
- Clustered navigation items logically
- Related content sections with appropriate spacing

## 🔧 JavaScript Features

### 1. Form Validation (signup.html)
```javascript
// Comprehensive validation including:
✅ Required field validation
✅ Email format verification
✅ Password strength requirements
✅ Password confirmation matching
✅ Terms & conditions agreement
✅ Real-time validation feedback
```

### 2. Interactive Navigation Menu
```javascript
// Mobile-responsive navigation:
✅ Hamburger menu toggle
✅ Click outside to close
✅ Keyboard accessibility (ESC key)
✅ Smooth animations and transitions
```

### 3. Dynamic Content
```javascript
// Time-based features:
✅ Dynamic greetings (Good Morning/Afternoon/Evening)
✅ Real-time date display
✅ Automatic content updates
```

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Small devices (phones, 600px and down) */
@media (max-width: 480px) { /* Mobile styles */ }

/* Medium devices (tablets, 768px and down) */
@media (max-width: 768px) { /* Tablet styles */ }

/* Large devices (desktops, 1200px and up) */
@media (min-width: 1200px) { /* Desktop styles */ }
```

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Alt Text**: Descriptive alternative text for all images
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Focus Indicators**: Clear visual focus states

## 🔍 SEO Optimization

### Meta Tags Implementation
```html
<title>Page-specific titles for each page</title>
<meta name="description" content="Relevant page descriptions">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Structured Data
- Proper heading hierarchy (H1 → H6)
- Semantic HTML5 elements
- Descriptive alt attributes
- Meaningful link text

## 🎓 Educational Purpose

This project serves as a comprehensive demonstration of web development skills including:

- **Frontend Development**: HTML, CSS, JavaScript integration
- **Responsive Design**: Mobile-first approach with Bootstrap
- **User Experience**: Interactive elements and accessibility
- **Version Control**: Git workflow and project management
- **Web Standards**: Semantic markup and SEO best practices

## 📝 Credits & Attribution

### Artwork Credits
All artworks featured in this catalog are properly attributed to their original creators:
- **Digital Illustrations**: Hailie Felicia Alberto (Zakii)
- **Character Art**: Creative works showcasing various artistic styles
- **Graphic Design**: Professional design pieces and layouts

### Educational Use
This project is created for educational purposes as part of a Web Development course. All images and content are used with proper attribution and for non-commercial educational demonstration.

## 🤝 Contributing

While this is a student project, feedback and suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature-improvement`)
5. Open a Pull Request

## 📞 Contact

**Developer**: Hailie Felicia Alberto  
**Course**: Web Development  
**Project**: Final Project - Online Art Catalog  
**Email**: [your-email@example.com]

---

## 🏆 Project Completion Checklist

### HTML & CSS (F1-F2)
- ✅ Multi-page website (5+ pages)
- ✅ Semantic HTML structure
- ✅ CSS styling with Bootstrap framework
- ✅ Fully responsive design

### JavaScript (F3-F4)
- ✅ Form validation (signup page)
- ✅ Interactive menu toggle
- ✅ Dynamic greeting and date display

### Web Technologies (F5)
- ✅ Design principles applied (contrast, alignment, repetition, proximity)
- ✅ SEO elements (titles, meta descriptions, alt text)

### Version Control (F6)
- ✅ Git repository initialized
- ✅ Meaningful commit messages
- ✅ Feature branch created and merged

### Deployment (F7)
- ✅ Ready for GitHub Pages deployment
- ✅ Live link preparation
- ✅ Production-ready code

---

**Live Demo**: [https://yourusername.github.io/artvista-art-catalog/](https://yourusername.github.io/artvista-art-catalog/)

*Built with ❤️ for Web Development Course - November 2025*