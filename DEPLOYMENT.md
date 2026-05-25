# Deployment Guide - Weverse Shop Clone

This guide covers deploying your Weverse Shop Clone to production.

## Quick Start: Deploy to Vercel (Recommended)

Vercel is the optimal platform for Next.js applications and provides one-click deployments.

### Prerequisites
- GitHub account with your repository pushed
- Vercel account (free at https://vercel.com)

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `.` (auto-detected)
   - Leave other settings as default
   - Click "Deploy"

4. **Add Environment Variables (if needed)**
   After deployment, add environment variables:
   - Go to Settings → Environment Variables
   - Add any required variables (DATABASE_URL, API keys, etc.)
   - Redeploy for changes to take effect

5. **Your app is live!**
   - Vercel provides a production URL: `yourproject.vercel.app`
   - Custom domain support available in Settings

### Benefits of Vercel
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN for fast delivery
- ✅ Automatic builds on every git push
- ✅ Preview deployments for pull requests
- ✅ Serverless Functions (API routes) auto-scaling
- ✅ Free tier includes generous limits

---

## Alternative: Deploy to Other Platforms

### Netlify

1. **Connect your GitHub repo**
   - Go to https://app.netlify.com/
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your repository

2. **Configure Build Settings**
   - Build command: `pnpm build` (or `npm run build`)
   - Publish directory: `.next`
   - Environment variables: Add in Site Settings → Build & Deploy

3. **Deploy**
   - Netlify automatically deploys when you push to GitHub
   - Your site will be live at `your-site-name.netlify.app`

### Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize and select your repository

3. **Configure Environment**
   - Railway auto-detects Next.js
   - Add environment variables in project settings
   - Click "Deploy"

### Self-Hosted (Docker)

1. **Build Docker Image**
   ```bash
   docker build -t weverse-shop .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your-database-url" \
     weverse-shop
   ```

3. **Deploy to Server**
   - Push Docker image to registry
   - Deploy to your server (AWS, DigitalOcean, etc.)

---

## Database Setup

### Using Vercel Postgres (Recommended with Vercel)

1. **Create PostgreSQL Database**
   - In Vercel dashboard: Storage → Create Database → Postgres
   - Copy the connection string

2. **Add Environment Variable**
   ```
   DATABASE_URL=<your-connection-string>
   ```

3. **No migrations needed** - the app uses seed data

### Using Neon (Free PostgreSQL)

1. **Create Account**
   - Go to https://neon.tech
   - Sign up and create a project

2. **Get Connection String**
   - Copy PostgreSQL connection string
   - Add to your environment variables

3. **Update DATABASE_URL**
   ```
   DATABASE_URL=postgresql://user:password@host/database
   ```

### Using Supabase (PostgreSQL + Auth)

1. **Create Project**
   - Go to https://supabase.com
   - Create new project

2. **Get Connection String**
   - In project settings, copy PostgreSQL URL
   - Add to environment variables

3. **Benefits**
   - Built-in authentication
   - Realtime functionality
   - Row-level security
   - Free tier available

### SQLite (Development Default)

SQLite is configured by default but works for small deployments only:
- Pro: Zero setup, no external database
- Con: Limited scalability, shared hosting issues

**Not recommended for production** - use PostgreSQL instead.

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

### Code Quality
- [ ] No console.log statements left in production code
- [ ] No hardcoded API keys or secrets
- [ ] All environment variables use `process.env`
- [ ] TypeScript builds without errors: `pnpm build`

### Configuration
- [ ] `.env.example` documents all required environment variables
- [ ] `next.config.mjs` has appropriate settings
- [ ] Images optimized and stored in `public/` directory
- [ ] Redirects configured if needed

### Testing
- [ ] Homepage loads without errors
- [ ] Product listing shows 25 products
- [ ] Product detail pages work
- [ ] Add to cart functionality works
- [ ] Checkout flow completes
- [ ] Mobile responsive design verified

### Performance
- [ ] Images optimized (Next.js Image optimization enabled)
- [ ] Bundle size reasonable: `pnpm build` shows size
- [ ] No unused dependencies
- [ ] API routes respond quickly

### Security
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] CORS properly configured if needed
- [ ] No sensitive data in client-side code
- [ ] Input validation in place
- [ ] Database credentials in environment variables only

### SEO & Metadata
- [ ] Page titles set appropriately
- [ ] Meta descriptions configured
- [ ] Open Graph tags for social sharing
- [ ] Sitemap generated (optional)

---

## Environment Variables

### Required Variables

```bash
# Database (if using external database)
DATABASE_URL="postgresql://user:password@host/database"

# Node environment
NODE_ENV="production"
```

### Optional Variables

```bash
# Stripe (if adding payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Custom Domain
NEXT_PUBLIC_SITE_URL="https://yoursite.com"
```

---

## Monitoring & Maintenance

### Monitor Deployment

**Vercel:**
- Go to your project dashboard
- Check "Deployments" tab for build logs
- Check "Functions" tab for API route logs
- Check "Analytics" tab for metrics

**Other Platforms:**
- Each platform provides logs and monitoring
- Check documentation for your platform

### Common Issues & Solutions

**Issue: Build fails**
- Solution: Check build logs for errors
- Check environment variables are set
- Ensure `pnpm install` works locally

**Issue: API routes 404**
- Solution: Routes must be in `/app/api/` directory
- Check route file naming follows `route.ts` convention
- Restart dev server after file changes

**Issue: Images not loading**
- Solution: Check images exist in `public/images/`
- Verify image paths are correct
- Clear browser cache

**Issue: Database connection error**
- Solution: Verify `DATABASE_URL` environment variable
- Test connection string locally
- Check firewall/security groups allow connections

---

## Domain Setup

### Add Custom Domain to Vercel

1. Go to project Settings → Domains
2. Add your domain (e.g., `weverseshop.com`)
3. Update DNS records at your domain registrar:
   - Point to Vercel nameservers, OR
   - Add CNAME record to `cname.vercel.com`
4. SSL certificate auto-provisioned (typically 24 hours)

### Add Custom Domain to Other Platforms

Refer to your platform's documentation:
- Netlify: Settings → Domain management
- Railway: Settings → Custom Domain
- Self-hosted: Configure your reverse proxy (Nginx, Apache)

---

## Scaling Considerations

### As Traffic Grows

**Serverless (Vercel/Netlify):** 
- Automatically scales with traffic
- No configuration needed
- Pay for what you use

**Self-Hosted:**
- Add load balancer (Nginx)
- Horizontal scaling (multiple servers)
- Database read replicas
- CDN for static assets

### Performance Optimization

1. **Enable Image Optimization**
   - Already enabled in `next.config.mjs`
   - Images served via Vercel CDN on Vercel

2. **Enable Compression**
   - Gzip compression (automatic)
   - Next.js compression enabled

3. **Database Optimization**
   - Add database indexes
   - Use connection pooling
   - Monitor query performance

---

## Rollback Procedure

### Vercel Rollback

1. Go to Deployments
2. Find previous working deployment
3. Click the deployment
4. Click "Redeploy" button

### Git-Based Rollback

```bash
# Find previous commit
git log --oneline

# Revert to previous commit
git revert <commit-hash>
git push origin main

# Deploy will trigger automatically
```

---

## Support & Help

### Vercel Documentation
- Deployment Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Status Page: https://vercel.statuspage.io

### Community Help
- Next.js Discord: https://discord.gg/nextjs
- Stack Overflow: Tag `next.js` and `vercel`
- GitHub Discussions

---

## Next Steps After Deployment

1. **Set up monitoring**
   - Error tracking (Sentry, Rollbar)
   - Analytics (Google Analytics, PostHog)
   - Performance monitoring (Web Vitals)

2. **Add payment processing** (if needed)
   - Stripe integration
   - Webhook handlers
   - Environment variable setup

3. **Backup strategy**
   - Database backups
   - Version control
   - Disaster recovery plan

4. **Continuous Deployment**
   - Automatic deployments on git push (configured)
   - Status checks and reviews
   - Staging environment for testing

---

**Your Weverse Shop Clone is ready for production! 🚀**

For questions or issues, check the main README.md or deployment logs on your platform.
