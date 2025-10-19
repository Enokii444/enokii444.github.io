# Featured Works Section - Update Guide

## Overview
The Featured Works section on the homepage (`index.html`) automatically displays 4 randomly selected images from your art galleries. The selection is balanced to show work from different categories.

## Current Image Pool
The system pulls from these directories:
- **Graphics**: `GRAPHICS/` folder (posters, logos, web mockups)
- **Illustrations**: `ILLUSTRATION/` folder (character art, portraits)
- **Prints & Merch**: `COMING_SOON/` folder (physical products, tattoos, clay work)

## How to Add New Images

### Step 1: Add Your Image Files
1. Place new image files in the appropriate folder:
   - Graphics work → `GRAPHICS/`
   - Illustrations → `ILLUSTRATION/`
   - Prints & Merch → `COMING_SOON/`

### Step 2: Update the JavaScript Array
1. Open `index.html`
2. Find the `imagePool` array in the JavaScript section
3. Add new entries following this format:

```javascript
{
  src: 'FOLDER_NAME/your-image.jpg',
  alt: 'Descriptive alt text for accessibility',
  caption: 'Image Title — Category: Category Name',
  category: 'Graphics', // or 'Illustration' or 'Prints & Merch'
  aspect: 'portrait' // or 'poster', 'web', 'square'
}
```

### Step 3: Choose the Right Aspect Ratio
- `'portrait'` → 4:5 ratio (most illustrations, character art)
- `'poster'` → 4:5 ratio (movie posters, print designs)
- `'web'` → 16:9 ratio (website mockups, wide layouts)
- `'square'` → 1:1 ratio (social media posts, square compositions)

## Example Addition
```javascript
{
  src: 'GRAPHICS/MY_NEW_POSTER.jpg',
  alt: 'Colorful event poster design',
  caption: 'Music Festival Poster — Category: Graphics',
  category: 'Graphics',
  aspect: 'poster'
}
```

## Selection Logic
The system randomly picks:
- **1-2 images** from Graphics
- **1 image** from Illustrations  
- **1 image** from Prints & Merch
- **Fills remaining slots** from any category if needed

## Features
- ✅ **Random selection** on each page refresh
- ✅ **Responsive grid**: 1→2→4 columns (mobile→tablet→desktop)
- ✅ **Lightbox viewer** with caption display
- ✅ **Hover effects** with pastel overlay
- ✅ **Keyboard navigation** (arrows, escape)
- ✅ **Accessibility features** (alt text, ARIA labels)

## Troubleshooting
- **Images not showing?** Check file paths and make sure images exist in the specified folders
- **Wrong aspect ratio?** Update the `aspect` property in the image object
- **Want different category balance?** Modify the selection logic in `selectRandomImages()` method

## Customization
- **Change grid columns**: Modify the CSS `.featured-grid` media queries
- **Adjust hover effects**: Update `.featured-tile:hover` styles
- **Different selection algorithm**: Edit `selectRandomImages()` method
- **Change button text**: Update the "View All Artworks →" text in HTML