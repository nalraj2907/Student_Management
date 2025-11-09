# Open Source Image Sources

This project uses interactive decorative images from open source websites. You can easily replace or add images from these free sources:

## Recommended Open Source Image Websites

### 1. **Unsplash** (https://unsplash.com)
- Free, high-quality photos
- No attribution required (though appreciated)
- Example URL format: `https://images.unsplash.com/photo-[ID]?w=400&h=400&fit=crop`

### 2. **Pexels** (https://www.pexels.com)
- Free stock photos
- No attribution required
- Example URL format: `https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=400&h=400`

### 3. **Pixabay** (https://pixabay.com)
- Free images, vectors, and illustrations
- No attribution required
- Great for child-friendly illustrations

### 4. **OpenPeeps** (https://www.openpeeps.com)
- Free illustrated characters
- Perfect for child-style images
- SVG format available

## How to Replace Images

### Option 1: Edit `DecorativeImages.jsx`

Open `src/components/DecorativeImages.jsx` and update the `IMAGE_SOURCES` object:

```javascript
const IMAGE_SOURCES = {
  student1: 'YOUR_IMAGE_URL_HERE',
  student2: 'YOUR_IMAGE_URL_HERE',
  // ... etc
};
```

### Option 2: Use Direct URLs in Components

You can also use image URLs directly in any component:

```jsx
<img 
  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop"
  alt="Description"
/>
```

## Image Search Tips

1. **Search terms for student/education images:**
   - "students learning"
   - "children studying"
   - "education"
   - "school"
   - "kids reading"

2. **For child-style illustrations:**
   - "cartoon children"
   - "illustration kids"
   - "cute students"
   - "animated children"

## Current Image Usage

- **Header decorative images**: Floating student images in the header banner
- **Empty state images**: Interactive student images when no students exist
- **Card hover effects**: Subtle background images on student card hover
- **Student avatars**: User-uploaded or default gradient avatars

## Image Optimization

All images are automatically optimized by:
- Using appropriate dimensions (w=400&h=400)
- Using `fit=crop` for consistent sizing
- Lazy loading where appropriate
- Error handling for failed image loads

## License Information

All images from Unsplash, Pexels, and Pixabay are free to use for commercial and personal projects without attribution (though attribution is appreciated).

