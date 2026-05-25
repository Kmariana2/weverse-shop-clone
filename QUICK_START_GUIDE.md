# Quick Start Guide - Weverse Shop Clone

Get your shop running locally or deployed in minutes.

## Option 1: Local Development (5 minutes)

### Install & Run

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm run dev

# 3. Open in browser
# Visit http://localhost:3000
```

That's it! Your shop is running locally.

### Test the App

- **Homepage:** Browse 25 products
- **Product Details:** Click any product
- **Add to Cart:** Click "Add to Cart" button
- **View Cart:** Click cart icon in header
- **Checkout:** Click "Proceed to Checkout"
- **Order:** Complete the checkout flow

### What Works Locally
- ✅ Product catalog with images
- ✅ Product detail pages
- ✅ Shopping cart (localStorage)
- ✅ Checkout flow
- ✅ API endpoints
- ✅ Responsive design

## Option 2: Deploy to Vercel (2 minutes)

**Recommended for production - easiest deployment ever.**

### Prerequisites
- GitHub account (with code pushed)
- Vercel account (free at vercel.com)

### Steps

1. **Go to Vercel**
   ```
   https://vercel.com/new
   ```

2. **Import Your Repository**
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Import"

3. **Deploy**
   - Vercel auto-detects Next.js ✓
   - Auto-configures everything ✓
   - Click "Deploy" button
   - Done! 🎉

4. **Your Live URL**
   - Vercel provides: `yourproject.vercel.app`
   - Your site is live in ~60 seconds
   - HTTPS automatically enabled

### After Deployment

- Go to Settings → Domains to add custom domain
- No additional configuration needed
- Your site auto-updates on every GitHub push

## Option 3: Deploy to Netlify (2 minutes)

### Steps

1. **Go to Netlify**
   ```
   https://app.netlify.com/
   ```

2. **Add New Site**
   - Click "New site from Git"
   - Authorize GitHub
   - Select your repo
   - Click "Deploy site"

3. **Your Site is Live**
   - Netlify provides: `yoursite-name.netlify.app`
   - HTTPS enabled automatically

## Option 4: Deploy to Railway (3 minutes)

### Steps

1. **Go to Railway**
   ```
   https://railway.app
   ```

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize and select your repo
   - Click "Deploy"

3. **Your Site is Live**
   - Railway generates a URL automatically

## Build for Production

### Build Command
```bash
pnpm build
```

This creates a production-ready build in `.next/` directory.

### Test Production Build Locally
```bash
# After building:
pnpm run start
```

Visit `http://localhost:3000` - your production build locally.

## Environment Variables

### Local Development
No special setup needed - works out of the box with SQLite.

### Production (Optional)

Only needed if using external database:

```bash
# Example: Using PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/weverse_shop"
```

Set in your platform's environment variables section.

## Troubleshooting

### Issue: Port 3000 already in use
```bash
# Use different port
PORT=3001 pnpm run dev
```

### Issue: Dependencies missing
```bash
# Reinstall dependencies
pnpm install --force
```

### Issue: Build fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

### Issue: Images not showing
- Verify images exist in `public/images/products/`
- Check image filenames match in `lib/products-data.ts`
- Clear browser cache (Ctrl+Shift+Del)

## Project Structure

```
.
├── app/                    # Pages and API routes
├── components/             # React components
├── lib/                    # Utilities and data
├── public/                 # Static files and images
├── styles/                 # CSS styles
├── prisma/                 # Database config
├── package.json            # Dependencies
└── README.md               # Full documentation
```

## Key Features Working

- ✅ 25 Products (10 Apparel, 15 Accessories)
- ✅ Product Images (53 total, 2-4 per product)
- ✅ Category Filtering
- ✅ Shopping Cart
- ✅ Checkout Flow (3 steps)
- ✅ Image Gallery
- ✅ Responsive Design
- ✅ API Endpoints

## What's Ready for Production

- ✅ Application builds without errors
- ✅ All routes working
- ✅ API endpoints functional
- ✅ Database-ready structure
- ✅ Environment variables configured
- ✅ HTTPS on Vercel
- ✅ Global CDN
- ✅ Auto-scaling

## Next Steps

### Before Going Live

1. **Test locally:** `pnpm run dev`
2. **Check responsive:** Resize browser
3. **Test checkout:** Complete purchase flow
4. **Verify images:** All products show images

### To Go Live

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Deploy:** Use one of the deployment options above

3. **Test live:** Visit your deployed URL

### Optional Customizations

- [ ] Add your branding/logo
- [ ] Update colors in `tailwind.config.ts`
- [ ] Replace product images
- [ ] Update product prices in `lib/products-data.ts`
- [ ] Add real payment processing (Stripe)
- [ ] Enable user accounts (Supabase)

## Documentation

For detailed information, see:
- **README.md** - Full feature list and architecture
- **DEPLOYMENT.md** - Complete deployment guide for all platforms
- **BUILD_SUMMARY.md** - Build information and project overview
- **FINALIZATION_SUMMARY.md** - What was completed

## Support

- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind Docs: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com

---

**You're ready to go! Choose your deployment option above and get your shop live. 🚀**

Questions? Check the README.md or DEPLOYMENT.md for more details.
