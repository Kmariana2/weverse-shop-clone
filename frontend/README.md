# Weverse Shop Frontend

Next.js 15 + React 19 frontend for Weverse Shop clone.

## Setup

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure environment

Create a `.env.local` file (copy from `.env.example`):

```bash
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

For production, set `NEXT_PUBLIC_API_URL` to your backend URL.

### 3. Start development server

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Features

- **Product Grid**: Shows 25 products (not 50) with filtering by category
- **Product Detail Page**: Full image gallery with thumbnail strip, click to swap images
- **Mobile Optimized**: Swipeable gallery on mobile with dot indicators
- **Shopping Cart**: Side drawer with live item count, quantity adjusters, remove button
- **3-Step Checkout**: Shipping → Payment → Review with progress indicator
- **Countdown Timers**: Pulsing red when under 1 hour
- **Stock Indicators**: Shows "Only X left" for low-stock items
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 3
- **State**: Zustand for cart, UI, and auth state with localStorage persistence
- **HTTP**: Axios for API calls
- **Icons**: Lucide React

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with Header, Footer, Cart Drawer
│   ├── globals.css          # Global styles
│   ├── page.tsx             # Home page with hero and product grid
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx     # Product detail page with image gallery
│   ├── checkout/
│   │   └── page.tsx         # 3-step checkout flow
│   └── order-confirmation/
│       └── page.tsx         # Order confirmation page
├── components/
│   ├── Header.tsx           # Sticky header with cart icon
│   ├── Footer.tsx           # Footer with links
│   ├── Hero.tsx             # Dark gradient hero section
│   ├── FilterBar.tsx        # Category filter pills
│   ├── ProductCard.tsx      # Single product card (grid item)
│   ├── ProductGrid.tsx      # Grid layout for products
│   ├── ImageGallery.tsx     # Swipeable image gallery with thumbnails
│   ├── CountdownTimer.tsx   # Timer that pulses when < 1 hour
│   ├── CartDrawer.tsx       # Side drawer for shopping cart
│   └── Toast.tsx            # Toast notification
├── lib/
│   ├── api.ts               # API client (Axios)
│   ├── store.ts             # Zustand stores (cart, auth, UI)
│   └── hooks.ts             # useCountdown, formatPrice
└── public/                  # Static assets
```

## Key Features & Architecture

### Image Gallery
- **Desktop**: Click thumbnails to swap main image
- **Mobile**: Swipeable carousel with dot indicators
- **Keyboard**: Arrow buttons to navigate
- Shows all product images (front, back, detail, label, etc.)

### Shopping Cart
- Persists to localStorage
- Side drawer from right
- Live item count badge on cart icon
- Quantity adjusters (+/-) for each item
- Remove button for each item
- Subtotal display

### Checkout Flow
1. **Shipping**: Collect address information
2. **Payment**: Fake card form (demo mode)
3. **Review**: Confirm items, total, and shipping address
4. **Confirmation**: Order number and success message

### State Management
- **useCart**: Items, add, remove, update quantity, clear
- **useAuth**: Current user, login/logout
- **useUI**: Cart drawer visibility, toast notifications

## API Integration

Frontend communicates with backend via `NEXT_PUBLIC_API_URL`:

```
GET  /api/products          # List products (with first image only)
GET  /api/products?category=Apparel  # Filter by category
GET  /api/products/:id      # Get full product (all images)
POST /api/auth/register     # Register user
POST /api/auth/login        # Login user
GET  /api/auth/me           # Get current user
GET  /api/cart              # Get user's cart
POST /api/cart              # Add to cart
DELETE /api/cart/:itemId    # Remove from cart
POST /api/checkout          # Create order
```

## Deployment to Vercel

```bash
npm run build
# Deploy to Vercel
vercel
```

Set environment variable in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`: Your production backend URL

## Running Both Services Locally

Terminal 1 - Backend:
```bash
cd backend
npm install
npm run seed
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser!

## Product Data

25 products across 5 categories:
- **Apparel (9)**: T-shirts, hoodies, jackets, cardigans
- **RUN SEOKJIN (4)**: Solo tour merch
- **Member Jerseys (3)**: Solo member baseball jerseys
- **j-hope Collection (4)**: Solo member tour merch
- **Accessories (5)**: Backpack, light stick, light stick bag, laptop pouch, candle

Each product has:
- 1-3 images (front, back, detail, label shots grouped by product)
- Price in USD
- EXCLUSIVE and LIMITED badges
- Shipping information
- Stock count (1-9 items)
- Countdown timer (30min - 8hrs)
- Product description
- Multiple size options

## Notes

- This is a demo with fake image placeholders. Replace with real product images.
- Payment form is not actually processing - demo mode only.
- Auth is minimal for demo purposes. Implement proper JWT/sessions for production.
- All prices, timers, and stock counts are demo data.
