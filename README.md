# Printolution Website

A premium, multi-page website for Printolution - a creative printing and design company. Built with pure HTML, CSS, and vanilla JavaScript with no frameworks.

## Features

### Technical Stack
- **Pure HTML5** - Semantic markup with WCAG 2.1 AA accessibility
- **CSS3** - Mobile-first responsive design with custom animations
- **Vanilla JavaScript** - Modular, no framework dependencies
- **Performance Optimized** - CLS < 0.1, LCP < 2.5s target

### Design Highlights
- Clean print-studio aesthetic with premium feel
- Animated hero section with 3D mockups and morphing blob
- Smooth scroll animations with IntersectionObserver
- Accessible navigation with focus states
- Prefers-reduced-motion support

### Pages
1. **Home** (`index.html`) - Hero, highlights, services, testimonials, FAQ
2. **About** (`about.html`) - Company story, founders, beliefs, vision/mission
3. **Services** (`services.html`) - Design studio, printing solutions, promotional products
4. **Contact** (`contact.html`) - Contact form with validation
5. **Quote** (`quote.html`) - Multi-step quote request form with instant estimates
6. **Careers** (`careers.html`) - Job listings with application modal
7. **Legal Pages** - Terms, Privacy Policy, Disclaimer

### Key Components
- Sticky header with scroll effects
- Mobile hamburger menu
- Testimonial carousel with swipe support
- FAQ accordion
- Multi-step quote form with sessionStorage
- Form validation with honeypot spam protection
- Counter animations
- Process timeline with progress indicator

## File Structure

```
printolution/
├── index.html
├── about.html
├── services.html
├── contact.html
├── quote.html
├── careers.html
├── terms.html
├── privacy.html
├── disclaimer.html
├── sitemap.xml
├── robots.txt
├── css/
│   ├── main.css          # Global styles
│   ├── home.css          # Home page specific
│   ├── about.css         # About page specific
│   ├── services.css      # Services page specific
│   ├── contact.css       # Contact page specific
│   ├── quote.css         # Quote page specific
│   ├── careers.css       # Careers page specific
│   └── legal.css         # Legal pages styles
└── js/
    ├── main.js           # Shared functionality
    ├── home.js           # Home page specific
    ├── about.js          # About page specific
    ├── contact.js        # Contact form handling
    ├── quote.js          # Quote form handling
    └── careers.js        # Careers modal & form
```

## Color Palette

- **Deep Charcoal**: `#0E0E10` - Primary text
- **Off-White**: `#F7F7F5` - Background
- **Accent Ink**: `#2A5FFF` - Primary actions
- **Soft Gold**: `#E7C873` - Accents (sparingly)
- **Muted Gray**: `#8E9196` - Secondary text

## Typography

- **Headings**: Poppins (600, 700)
- **Body**: Inter (400, 500, 600)
- **Fallback**: System fonts

## Responsive Breakpoints

- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: 768px - 1024px
- Large: 1024px - 1280px
- XL: 1280px+

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Preconnect to Google Fonts
- Lazy loading for below-fold images
- Minimal JavaScript execution
- CSS animations with GPU acceleration
- Intersection Observer for scroll animations
- SessionStorage for form persistence

## Accessibility Features

- Semantic HTML5 landmarks
- ARIA labels and roles
- Keyboard navigation support
- Focus visible styles
- Color contrast ≥ 4.5:1
- Prefers-reduced-motion support
- Alt text for all images

## SEO Features

- Meta descriptions on all pages
- Open Graph tags
- JSON-LD structured data
- Sitemap.xml
- Robots.txt
- Semantic heading hierarchy
- Canonical URLs ready

## Form Integration

Forms are currently set up with client-side validation and simulate submission. To integrate with a backend:

1. **Contact Form** (`js/contact.js`): Replace the setTimeout with actual fetch call
2. **Quote Form** (`js/quote.js`): Replace the setTimeout with actual fetch call
3. **Careers Form** (`js/careers.js`): Replace the setTimeout with actual fetch call

Example integration:
```javascript
fetch('your-backend-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    // Handle success
})
.catch(error => {
    // Handle error
});
```

## Local Development

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```
3. Navigate to `http://localhost:8000`

## Deployment

1. Upload all files to your web server
2. Update domain references in:
   - `sitemap.xml`
   - JSON-LD structured data in `index.html`
3. Configure SSL certificate
4. Test all forms and links

## Customization

### Colors
Edit CSS variables in `css/main.css`:
```css
:root {
    --charcoal: #0E0E10;
    --off-white: #F7F7F5;
    --accent-ink: #2A5FFF;
    /* ... */
}
```

### Content
All content is in HTML files. Update text directly in the markup.

### Images
Replace placeholder gradients with actual images:
- Hero mockups: `.mockup-1`, `.mockup-2`, `.mockup-3`
- Featured work: `.work-item`
- About page: `.image-placeholder`
- Founder images: `.founder-image`

## License

© 2025 Printolution. All Rights Reserved.

## Contact

For questions or support:
- Email: info@printolution.com
- Phone: +91 98765 43210
