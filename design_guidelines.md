# Design Guidelines: Vivekanand Upadhyay Career Counselling Website

## Design Approach
**Hypermodern Career Platform** - Drawing inspiration from modern SaaS platforms like Linear and Stripe, combined with the vibrant energy of contemporary portfolio sites. This website demands a visually stunning, award-worthy UI that makes visitors say "WOW!" while maintaining excellent usability.

## Visual Style & Effects

### Glassmorphism & Depth
- Implement glassmorphism effects throughout with frosted glass backgrounds (backdrop-blur)
- Floating card designs with pronounced shadows and depth layering
- Gradient overlays with transparency (from-blue-500/20 to-purple-500/20)
- Soft, glowing effects on key elements (profile image, buttons, cards)

### Animation Philosophy
- Smooth, professional animations using Framer Motion throughout the entire site
- Parallax scrolling on hero sections with layered movement
- Viewport-triggered reveal animations as elements enter screen
- Micro-interactions on all interactive elements
- Animated gradient backgrounds that shift subtly
- Smooth page transitions between routes
- Loading screen with animated logo on initial visit

### Custom Cursor System
- Replace default cursor with custom animated cursor (circular design, 20px diameter)
- Cursor expands to 40px on hover over clickable elements
- Trail effect following cursor movement with fade
- Different states: default (subtle), hover (enlarged with glow), click (compressed)
- Smooth cubic-bezier easing for all cursor transitions
- Hide on mobile/touch devices

## Color System

### Light Theme
- **Primary**: #2563eb (Royal Blue)
- **Secondary**: #7c3aed (Purple)
- **Accent**: #0891b2 (Teal)
- **Background**: #ffffff
- **Text**: #1e293b
- **Surfaces**: Soft shadows with subtle elevation

### Dark Theme
- **Primary**: #3b82f6 (Bright Blue)
- **Secondary**: #a855f7 (Bright Purple)
- **Accent**: #06b6d4 (Cyan)
- **Background**: #0f172a (Dark Navy)
- **Surface**: #1e293b
- **Text**: #f1f5f9
- **Glows**: Neon-like accent glows on cards and buttons

### Gradient Palette
- **Hero**: from-blue-600 via-purple-600 to-teal-500
- **Cards**: from-blue-500/20 to-purple-500/20 (theme-aware)
- **Buttons**: Animated gradient shift on hover
- **Backgrounds**: Subtle animated gradients that shift over time

### Theme Toggle
- Smooth transition animation (300ms) when switching themes
- Animated sun/moon icon with rotation (180deg)
- Theme preference persisted in localStorage
- All gradients, shadows, and glows adapt dynamically to theme

## Typography

### Font System
- **Primary Font**: Inter or Poppins (modern, clean sans-serif)
- **Accent Font**: Space Grotesk or Archivo (for headings)
- Load via Google Fonts CDN

### Hierarchy
- **Hero Heading**: 4xl to 6xl (responsive), bold, gradient text effect
- **Section Headings**: 3xl to 4xl, semibold
- **Subheadings**: xl to 2xl, medium weight
- **Body**: base to lg, regular weight with 1.6 line-height for readability
- **Captions**: sm, medium weight with slight opacity

## Layout System

### Spacing Units
Primary spacing: Tailwind units of **4, 8, 12, 16, 24** (p-4, gap-8, mb-12, py-16, mt-24)
- Sections: py-16 to py-24 (desktop), py-12 (mobile)
- Component spacing: gap-8 for grids, space-y-4 for stacks
- Container: max-w-7xl with px-4 to px-8

### Grid Structure
- Desktop: 3-column grids for service cards (grid-cols-3)
- Tablet: 2-column (md:grid-cols-2)
- Mobile: Single column (grid-cols-1)
- Gap: gap-8 for consistent spacing

## Page Structure & Components

### Home Page Sections

**1. Hero Section** (Full viewport, 100vh)
- Animated gradient background with particle effects or geometric shapes
- Floating profile image (300px) with glow effect and subtle float animation
- Typewriter effect for tagline: "Ex Army Physician | Career Counsellor | Guiding Your Journey to Fulfillment"
- Two CTA buttons with pulse animations and gradient backgrounds
- Parallax scrolling on background elements

**2. About Me Section**
- Split layout: Image/graphic on left, content on right (50/50)
- Animated timeline showing career journey
- Key traits displayed as animated cards: Empathy, Deep Understanding, Career Expertise
- Slide-in animations from sides as section enters viewport

**3. Services Section**
- Three primary service cards in grid layout
- Animated icons (Career Guidance, Workshops, One-on-One Counselling)
- Hover effects reveal detailed descriptions with smooth expansion
- Target audience tags as floating pills below each card
- Cards have glassmorphism effect with gradient borders

**4. Why Choose Me Section**
- Animated statistics counters: Years of Experience, Students Helped, Success Rate
- Numbers count up when section enters viewport
- Circular progress indicators with gradient strokes
- Mission statement as large, centered quote with emphasis

**5. Testimonials Carousel**
- Horizontal carousel with smooth slide transitions
- Quote cards with glassmorphism background
- Animated quote marks (scale up on entry)
- Star ratings with staggered fill animation
- Navigation dots and arrow buttons with hover effects

**6. CTA Section**
- Eye-catching gradient background (full-width)
- Large "Book Consultation" button with pulse animation
- Contact details (email, phone) with animated icons
- WhatsApp integration with floating chat icon

### Services Page
- Detailed service cards with expanded descriptions
- Interactive FAQ accordion (smooth expand/collapse)
- Service process timeline with animated progress line
- Pricing tables (if applicable) with comparison features

### Blog/Articles Page
- Masonry grid layout with hover lift effects
- Category filter pills with smooth active state transitions
- Search bar with animated focus state
- Article cards with image, title, excerpt, read time
- Hover: Slight scale up, shadow increase, gradient overlay

### Contact Page
- Two-column layout: Form (60%) + Contact Info (40%)
- Form fields with floating labels animation
- Validation feedback with smooth color transitions
- Contact info: vivekupadhyay2005@gmail.com, 7030502200
- Social media icons with hover grow effect (Instagram emphasized)
- Success animation overlay on form submission

### Admin Dashboard
- Sidebar navigation (fixed, 240px) with icons and labels
- Main content area with cards for different sections
- Overview: Stats cards with charts and analytics
- Data tables with sorting, filtering, pagination
- Rich text editor for blog management
- Calendar view for consultation bookings
- Toast notifications for actions

## Mobile Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Adaptations
- Hamburger menu with slide-in animation from right
- Bottom navigation bar for key actions
- Stacked single-column layouts
- Touch-optimized button sizes (min 44px)
- Swipeable testimonials carousel
- Reduced animation complexity for performance

## Component Library

### Buttons
- Primary: Gradient background, white text, shadow, hover glow
- Secondary: Outline with gradient border, hover fill
- Sizes: sm (py-2 px-4), md (py-3 px-6), lg (py-4 px-8)
- Rounded: rounded-full for modern look

### Cards
- Glassmorphism background with backdrop-blur
- Gradient borders (1px)
- Hover: Slight lift (translateY(-4px)), shadow increase
- Padding: p-6 to p-8

### Forms
- Input fields with border gradient on focus
- Floating labels that animate on focus/value
- Error states with red glow and shake animation
- Success states with green checkmark animation

### Navigation
- Desktop: Horizontal navbar (sticky) with links and theme toggle
- Mobile: Hamburger with full-screen overlay menu
- Smooth underline animation on hover
- Active state with gradient text

## Animations Reference

### Scroll Triggers
- Fade up: Opacity 0→1, translateY(20px)→0
- Slide in: TranslateX(-50px)→0 for left, opposite for right
- Scale in: Scale(0.9)→1 with opacity
- Stagger children: 100ms delay between items

### Hover Effects
- Buttons: Scale(1.05), shadow increase, gradient shift
- Cards: TranslateY(-4px), shadow expansion
- Links: Underline grow from center
- Images: Slight zoom (scale 1.1) with overflow hidden

### Loading States
- Skeleton screens with shimmer effect
- Spinner with gradient stroke
- Progress bars with animated fill

## Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support (focus visible states)
- Color contrast ratio ≥ 4.5:1
- Reduced motion media query support (disable animations)
- Focus trap in modals and mobile menu

## Images
- **Hero**: Professional headshot of Vivekanand Upadhyay (300x300px, circular with glow)
- **About Section**: Career journey visual or consultation imagery
- **Service Cards**: Icon-based (use Lucide React icons)
- **Testimonials**: Client photos (circular, 60x60px)
- **Blog**: Featured images for articles (16:9 aspect ratio)

## Performance Considerations
- Lazy load images below fold
- Code splitting for admin dashboard
- Optimize animations (use transform/opacity only)
- Preload hero image and critical fonts
- Minimize animation on mobile for battery efficiency

This design creates a stunning, hypermodern experience that positions Vivekanand as a premium, professional career counsellor while maintaining accessibility and usability across all devices.