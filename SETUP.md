# Setup Instructions

## PowerShell Execution Policy Issue

If you encounter the error: "running scripts is disabled on this system", follow these steps:

### Option 1: Run in Command Prompt (Recommended)

1. **Open Command Prompt** (not PowerShell)
   - Press `Win + R`
   - Type `cmd` and press Enter

2. **Navigate to project directory:**
   ```cmd
   cd c:\xampp\htdocs\AISecurityTech\modern-ecommerce
   ```

3. **Install dependencies:**
   ```cmd
   npm install
   ```

4. **Start development server:**
   ```cmd
   npm run dev
   ```

### Option 2: Enable PowerShell Scripts (Administrator)

1. **Open PowerShell as Administrator**
   - Right-click Start menu
   - Select "Windows PowerShell (Admin)"

2. **Enable script execution:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Confirm with 'Y'**

4. **Now run npm commands:**
   ```powershell
   cd c:\xampp\htdocs\AISecurityTech\modern-ecommerce
   npm install
   npm run dev
   ```

### Option 3: Use Git Bash

If you have Git installed:

1. Open Git Bash
2. Navigate to project:
   ```bash
   cd /c/xampp/htdocs/AISecurityTech/modern-ecommerce
   ```
3. Run commands:
   ```bash
   npm install
   npm run dev
   ```

### Option 4: Bypass Policy for Single Command

```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
```

## Complete Installation Steps

### 1. Install Node.js (if not installed)

Download from: https://nodejs.org/
- Recommended: LTS version (v18 or higher)
- During installation, check "Add to PATH"

### 2. Verify Installation

Open Command Prompt and run:
```cmd
node --version
npm --version
```

You should see version numbers (e.g., v18.17.0 and 9.6.7)

### 3. Install Project Dependencies

```cmd
cd c:\xampp\htdocs\AISecurityTech\modern-ecommerce
npm install
```

This will install:
- React 18.2.0
- React Router 6.20.0
- TailwindCSS 3.3.6
- Framer Motion 10.16.16
- Lucide React 0.294.0
- Vite 5.0.8
- And all other dependencies

**Installation time:** 2-5 minutes depending on internet speed

### 4. Start Development Server

```cmd
npm run dev
```

The site will open at: `http://localhost:3000`

## Troubleshooting

### Issue: "npm: command not found"

**Solution:** Node.js is not installed or not in PATH
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Try again

### Issue: "EACCES: permission denied"

**Solution:** Run as administrator or fix npm permissions
```cmd
npm cache clean --force
```

### Issue: "Port 3000 is already in use"

**Solution:** Kill the process or use different port
```cmd
npx kill-port 3000
```
Or:
```cmd
npm run dev -- --port 3001
```

### Issue: "Module not found"

**Solution:** Reinstall dependencies
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Issue: Installation is very slow

**Solution:** Use a different npm registry
```cmd
npm config set registry https://registry.npmjs.org/
npm install
```

### Issue: "Cannot find module 'vite'"

**Solution:** Install Vite globally
```cmd
npm install -g vite
```

## Verification Checklist

After installation, verify:

- [ ] `node_modules` folder exists
- [ ] `package-lock.json` file created
- [ ] No error messages in terminal
- [ ] Dev server starts without errors
- [ ] Browser opens to localhost:3000
- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] Products page shows items
- [ ] Cart functionality works

## Next Steps

Once installation is successful:

1. ✅ **Customize branding** - Update logo and company name
2. ✅ **Add products** - Edit `src/data/products.js`
3. ✅ **Update contact info** - Edit footer and contact page
4. ✅ **Test features** - Try all pages and functionality
5. ✅ **Deploy** - Follow `DEPLOYMENT.md` guide

## Development Workflow

### Daily Development:
```cmd
# Start dev server
npm run dev

# Make changes to files
# Browser auto-refreshes

# Stop server: Ctrl + C
```

### Before Deployment:
```cmd
# Test production build
npm run build
npm run preview

# Check for errors
npm run lint
```

## Useful Commands

```cmd
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Update dependencies
npm update

# Check outdated packages
npm outdated

# Clean install (if issues)
npm ci
```

## IDE Setup (Optional)

### VS Code Extensions (Recommended):
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag

### VS Code Settings:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Performance Tips

### Faster Installation:
```cmd
# Use npm ci for clean install
npm ci

# Or use pnpm (faster alternative)
npm install -g pnpm
pnpm install
```

### Faster Development:
- Keep dev server running
- Use browser dev tools
- Enable React DevTools extension
- Use hot module replacement (already configured)

## Getting Help

If you encounter issues:

1. Check this SETUP.md file
2. Review DOCUMENTATION.md
3. Check browser console for errors
4. Review terminal output
5. Search error messages online
6. Check Node.js and npm versions

## System Requirements

**Minimum:**
- Node.js 16+
- npm 8+
- 2GB RAM
- Modern browser (Chrome, Firefox, Safari, Edge)

**Recommended:**
- Node.js 18+
- npm 9+
- 4GB+ RAM
- SSD storage
- Fast internet connection

## Success Indicators

You'll know setup is successful when:

✅ npm install completes without errors
✅ Dev server starts on port 3000
✅ Browser opens automatically
✅ Home page displays correctly
✅ No console errors
✅ Hot reload works when editing files
✅ All pages are accessible
✅ Images load properly
✅ Animations work smoothly

---

**Need more help?** Check the other documentation files:
- `README.md` - Project overview
- `QUICKSTART.md` - Quick start guide
- `DOCUMENTATION.md` - Detailed documentation
- `DEPLOYMENT.md` - Deployment guide

**Version:** 1.0.0
**Last Updated:** October 2025
