# Deployment Guide

This guide covers deploying your Modern E-Commerce website to various hosting platforms.

## Pre-Deployment Checklist

- [ ] Test all features locally
- [ ] Update environment variables
- [ ] Optimize images and assets
- [ ] Run production build successfully
- [ ] Test production build locally
- [ ] Update contact information
- [ ] Configure analytics
- [ ] Set up error tracking
- [ ] Prepare backup strategy

## Building for Production

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Test production build locally
npm run preview
```

The build output will be in the `dist` folder.

---

## Deployment Options

### 1. Vercel (Recommended)

**Easiest deployment with automatic CI/CD**

#### Via Vercel CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Via GitHub:
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables
7. Click "Deploy"

**Custom Domain:**
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

### 2. Netlify

**Great for static sites with form handling**

#### Via Netlify CLI:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Via Drag & Drop:
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to Netlify Drop

#### Via GitHub:
1. Push to GitHub
2. Connect repository in Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

**Netlify Configuration File** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### 3. GitHub Pages

**Free hosting for static sites**

#### Setup:
1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

---

### 4. Traditional Web Hosting (cPanel, FTP)

**For shared hosting or VPS**

#### Steps:
1. Build the project:
```bash
npm run build
```

2. Upload `dist` folder contents via FTP/SFTP to your web root:
   - Usually: `public_html` or `www` folder

3. Configure `.htaccess` for React Router:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

4. Set correct file permissions:
   - Folders: 755
   - Files: 644

---

### 5. AWS S3 + CloudFront

**Scalable cloud hosting**

#### Setup:
1. Create S3 bucket
2. Enable static website hosting
3. Upload `dist` folder contents
4. Set bucket policy for public access:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

5. Create CloudFront distribution
6. Point to S3 bucket
7. Configure custom domain

---

### 6. Docker Deployment

**For containerized deployment**

#### Dockerfile:
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Build and run:
```bash
# Build image
docker build -t modern-ecommerce .

# Run container
docker run -p 80:80 modern-ecommerce
```

---

## Environment Variables

### Production Environment Variables

Create `.env.production`:
```bash
VITE_API_URL=https://api.yoursite.com
VITE_STRIPE_PUBLIC_KEY=pk_live_your_live_key
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

**Important:** Never commit `.env` files to version control!

### Setting Environment Variables by Platform:

**Vercel:**
- Project Settings → Environment Variables

**Netlify:**
- Site Settings → Build & Deploy → Environment

**GitHub Actions:**
- Repository Settings → Secrets

---

## Custom Domain Setup

### DNS Configuration

Add these records to your domain DNS:

**For Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

**For CloudFront:**
```
Type: A (Alias)
Name: @
Value: your-cloudfront-distribution.cloudfront.net

Type: CNAME
Name: www
Value: your-cloudfront-distribution.cloudfront.net
```

### SSL Certificate

Most platforms provide free SSL:
- **Vercel/Netlify:** Automatic
- **CloudFront:** Use AWS Certificate Manager
- **Traditional hosting:** Use Let's Encrypt

---

## Performance Optimization

### Before Deployment:

1. **Optimize Images:**
```bash
npm install -g sharp-cli
sharp -i input.jpg -o output.webp
```

2. **Analyze Bundle:**
```bash
npm run build -- --mode analyze
```

3. **Enable Compression:**
   - Gzip/Brotli compression (usually automatic on platforms)

4. **CDN Configuration:**
   - Use CDN for images and assets
   - Configure cache headers

### After Deployment:

1. **Test Performance:**
   - Google PageSpeed Insights
   - GTmetrix
   - WebPageTest

2. **Monitor:**
   - Set up error tracking (Sentry)
   - Configure analytics
   - Monitor uptime

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## Rollback Strategy

### Quick Rollback:

**Vercel:**
```bash
vercel rollback
```

**Netlify:**
- Go to Deploys → Click on previous deploy → "Publish deploy"

**GitHub Pages:**
```bash
git revert HEAD
git push
npm run deploy
```

---

## Monitoring & Maintenance

### Essential Monitoring:

1. **Uptime Monitoring:**
   - UptimeRobot
   - Pingdom
   - StatusCake

2. **Error Tracking:**
   - Sentry
   - Rollbar
   - Bugsnag

3. **Analytics:**
   - Google Analytics
   - Plausible
   - Fathom

4. **Performance:**
   - New Relic
   - Datadog
   - Lighthouse CI

### Regular Maintenance:

- Update dependencies monthly
- Review error logs weekly
- Check performance metrics
- Backup database (if applicable)
- Test critical user flows

---

## Troubleshooting

### Common Deployment Issues:

**1. Blank page after deployment:**
- Check browser console for errors
- Verify base URL in vite.config.js
- Check routing configuration

**2. 404 errors on refresh:**
- Configure server redirects
- Add .htaccess or netlify.toml
- Check server configuration

**3. Environment variables not working:**
- Prefix with VITE_
- Rebuild after adding variables
- Check platform-specific configuration

**4. Build fails:**
- Check Node.js version
- Clear node_modules and reinstall
- Review build logs for specific errors

**5. Slow loading:**
- Enable compression
- Optimize images
- Configure CDN
- Check bundle size

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] API keys in environment variables
- [ ] CORS properly configured
- [ ] Rate limiting on API endpoints
- [ ] Input validation on forms
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Regular security updates

---

## Support

For deployment issues:
1. Check platform documentation
2. Review build logs
3. Test locally with production build
4. Check community forums
5. Contact platform support

---

**Last Updated:** October 2024
**Version:** 1.0.0
