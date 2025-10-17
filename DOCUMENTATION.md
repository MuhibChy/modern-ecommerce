# Modern E-Commerce - Complete Documentation

## Table of Contents
1. [Site Maintenance Guide](#site-maintenance-guide)
2. [Product Management](#product-management)
3. [Category Management](#category-management)
4. [Promotion Management](#promotion-management)
5. [Content Updates](#content-updates)
6. [Styling Guide](#styling-guide)
7. [Component Reference](#component-reference)
8. [Troubleshooting](#troubleshooting)

---

## Site Maintenance Guide

### Daily Tasks
- Monitor product inventory status
- Check for customer inquiries via contact form
- Review order submissions
- Update promotional banners if needed

### Weekly Tasks
- Add new products to catalog
- Update product prices and availability
- Review and update featured products
- Check for broken links or images

### Monthly Tasks
- Analyze site performance
- Update promotional campaigns
- Review and update content
- Backup site data

---

## Product Management

### Adding a New Product

1. **Open the products file**: `src/data/products.js`

2. **Add product object to the array**:
```javascript
{
  id: 17, // Increment from last product ID
  name: 'Your Product Name',
  category: 'laptops', // Must match a category ID
  price: 1299,
  originalPrice: 1499, // Optional - for sale items
  image: 'https://your-image-url.com/product.jpg',
  rating: 4.5, // Out of 5
  reviews: 150, // Number of reviews
  inStock: true,
  featured: false, // Set true to show on homepage
  description: 'Detailed product description',
  specs: [
    'Specification 1',
    'Specification 2',
    'Specification 3',
  ],
  tags: ['new', 'gaming'], // Available: new, sale, bestseller, gaming, professional, business, creator
}
```

3. **Save the file** - Changes will appear immediately in development mode

### Updating Product Information

**To change price:**
```javascript
price: 999, // New price
originalPrice: 1299, // Optional - shows discount
```

**To mark as out of stock:**
```javascript
inStock: false,
```

**To feature on homepage:**
```javascript
featured: true,
```

**To add sale badge:**
```javascript
tags: ['sale'], // Add 'sale' to tags array
originalPrice: 1299, // Must include original price
```

### Product Image Guidelines

**Recommended specifications:**
- Format: JPG or WebP
- Dimensions: 800x800px (square, 1:1 ratio)
- File size: < 200KB
- Background: White or transparent
- Quality: High resolution

**Image hosting options:**
1. Use a CDN (Cloudinary, Imgix)
2. Host on your server in `/public/images/`
3. Use external URLs (Unsplash, product manufacturer sites)

### Product Categories

Available categories (defined in `src/data/products.js`):
- `laptops` - Laptop computers
- `desktops` - Desktop computers
- `components` - PC components (GPU, CPU, RAM, etc.)
- `peripherals` - Keyboards, mice, headphones
- `networking` - Routers, switches, network equipment
- `accessories` - Cables, storage, misc items

---

## Category Management

### Adding a New Category

1. **Open**: `src/data/products.js`

2. **Add to categories array**:
```javascript
export const categories = [
  // ... existing categories
  { 
    id: 'monitors', 
    name: 'Monitors', 
    icon: 'Monitor' // Lucide icon name
  },
];
```

3. **Update category icons** in `src/pages/Home.jsx`:
```javascript
{category.id === 'monitors' && '🖥️'}
```

### Removing a Category

1. Remove from categories array
2. Update or remove all products with that category
3. Test navigation to ensure no broken links

---

## Promotion Management

### Updating Hero Slider

**Location**: `src/pages/Home.jsx`

**Find the heroSlides array** (around line 15):
```javascript
const heroSlides = [
  {
    title: 'Your Main Headline',
    subtitle: 'Subheading Text',
    description: 'Detailed description of the promotion',
    cta: 'Button Text', // Call-to-action button
    link: '/products?tag=sale', // Where button leads
    gradient: 'from-blue-600 to-purple-600', // Color scheme
  },
  // Add more slides...
];
```

**Gradient color options:**
- `from-blue-600 to-purple-600` - Blue to purple
- `from-pink-600 to-red-600` - Pink to red
- `from-green-600 to-teal-600` - Green to teal
- `from-yellow-600 to-orange-600` - Yellow to orange

### Creating Special Offers

**To create a sale:**

1. **Tag products** with 'sale':
```javascript
tags: ['sale'],
```

2. **Set original price**:
```javascript
price: 999,
originalPrice: 1299,
```

3. **Update promotional banner** in `src/pages/Home.jsx`:
```javascript
<h2>Special Offer</h2>
<p>Get up to 50% off on selected items</p>
<Link to="/products?tag=sale">Shop Sale</Link>
```

### Promotional Banner

**Location**: `src/pages/Home.jsx` (around line 180)

```javascript
<h2>Your Promotion Title</h2>
<p>Your promotion description</p>
<Link to="/products?tag=sale">
  Shop Now
</Link>
```

---

## Content Updates

### Updating Company Information

**About Page** (`src/pages/About.jsx`):
- Company story (line 50-70)
- Mission and values (line 100-130)
- Team members (line 140-160)
- Statistics (line 30-40)

**Footer** (`src/components/Footer.jsx`):
- Company description (line 20)
- Contact information (line 120-140)
- Social media links (line 30-50)

### Updating Contact Information

**Files to update:**
1. `src/components/Footer.jsx`
2. `src/pages/Contact.jsx`

**Information to change:**
```javascript
// Phone
<a href="tel:+1234567890">+1 (234) 567-890</a>

// Email
<a href="mailto:support@modernshop.com">support@modernshop.com</a>

// Address
<p>123 Tech Street, Digital City, TC 12345</p>

// Business Hours
<p>Mon - Fri: 9:00 AM - 6:00 PM</p>
```

### Social Media Links

**Location**: `src/components/Footer.jsx` (around line 30)

```javascript
<a href="https://facebook.com/yourpage" target="_blank">
  <Facebook size={18} />
</a>
```

Update URLs for:
- Facebook
- Twitter
- Instagram
- LinkedIn
- GitHub

---

## Styling Guide

### Color Scheme

**Primary colors** (defined in `tailwind.config.js`):
```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Main blue
    600: '#0284c7', // Darker blue
  },
}
```

**Gradient combinations:**
- Blue to Purple: `from-blue-600 to-purple-600`
- Pink to Red: `from-pink-600 to-red-600`
- Green to Teal: `from-green-600 to-teal-600`

### Typography

**Font families:**
- Headings: Poppins (font-display)
- Body text: Inter (font-sans)

**Text sizes:**
- Hero: `text-5xl md:text-7xl`
- Page title: `text-4xl`
- Section heading: `text-3xl`
- Card title: `text-xl`
- Body: `text-base`
- Small: `text-sm`

### Glassmorphism Effects

**Available classes:**
```css
.glass          /* Light glass effect */
.glass-strong   /* Stronger glass effect */
```

**Custom glass effect:**
```css
bg-white/10 backdrop-blur-lg border border-white/20
```

### Buttons

**Available button styles:**
```jsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-ghost">Ghost Button</button>
```

### Cards

**Card styles:**
```jsx
<div className="card">Basic card</div>
<div className="card-hover">Card with hover effect</div>
```

---

## Component Reference

### Header Component

**Location**: `src/components/Header.jsx`

**Features:**
- Sticky navigation
- Search bar
- Shopping cart indicator
- User account menu
- Mobile responsive menu
- Category dropdown

**Customization:**
- Logo: Line 40-50
- Navigation links: Line 90-110
- Search placeholder: Line 60

### Footer Component

**Location**: `src/components/Footer.jsx`

**Sections:**
- Company info and social links
- Quick links
- Customer service links
- Contact information
- Newsletter signup

### ProductCard Component

**Location**: `src/components/ProductCard.jsx`

**Displays:**
- Product image
- Name and category
- Price and discount
- Rating and reviews
- Stock status
- Add to cart button
- Wishlist button

**Props:**
```javascript
<ProductCard product={productObject} />
```

---

## Troubleshooting

### Common Issues

**1. Products not showing**
- Check product data in `src/data/products.js`
- Verify category IDs match
- Check console for errors
- Ensure images load correctly

**2. Images not loading**
- Verify image URLs are accessible
- Check for CORS issues
- Use HTTPS URLs
- Optimize image sizes

**3. Cart not working**
- Clear browser localStorage
- Check CartContext in browser DevTools
- Verify product IDs are unique

**4. Search not finding products**
- Check product names and descriptions
- Verify search query formatting
- Test with different keywords

**5. Filters not working**
- Check category IDs match products
- Verify tag names are correct
- Test price range values

### Development Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- --port 3001
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Browser Compatibility

**Supported browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Known issues:**
- Backdrop blur may not work in older browsers
- Some animations require modern browser features

---

## Performance Tips

### Image Optimization
1. Use WebP format when possible
2. Implement lazy loading (already included)
3. Use CDN for image hosting
4. Compress images before upload

### Code Optimization
1. Remove unused dependencies
2. Enable production build for deployment
3. Use code splitting for large components
4. Minimize bundle size

### SEO Best Practices
1. Add unique meta descriptions per page
2. Use semantic HTML
3. Include alt text for all images
4. Create sitemap.xml
5. Implement structured data

---

## Getting Help

**Resources:**
- React Documentation: https://react.dev
- TailwindCSS Docs: https://tailwindcss.com
- Vite Guide: https://vitejs.dev
- Framer Motion: https://www.framer.com/motion

**Support:**
- Check README.md for setup instructions
- Review component code for examples
- Test in development mode before deploying
- Keep dependencies updated

---

Last Updated: October 2024
Version: 1.0.0
