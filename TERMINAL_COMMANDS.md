# 🔧 EXACT TERMINAL COMMANDS TO RUN

**Copy each command below and paste into PowerShell in order. Wait for each to complete before running the next.**

---

## ⚡ STEP-BY-STEP (COPY & PASTE)

### STEP 1: Navigate to Project
```powershell
cd "c:\Users\saidh\OneDrive\Desktop\CHARITY project"
```

### STEP 2: Install Node Packages
```powershell
npm install
```
**Wait:** This takes 2-3 minutes. You'll see: `added XXX packages`

### STEP 3: Install Supabase CLI Globally  
```powershell
npm install -g supabase
```
**Wait:** 1 minute. Completes silently.

### STEP 4: Start Local Supabase
```powershell
supabase start
```
**Wait:** 3-5 minutes. Watch for output with:
- `◼ API URL: http://127.0.0.1:54321`
- `◼ anon key: [long code]`
- `◼ service_role key: [long code]`

**IMPORTANT:** Copy these URLs and keys! You need them for `.env.local`

### STEP 5: Apply Database Schema
```powershell
supabase db reset
```
**Confirm:** Type `y` and press Enter when prompted
**Wait:** 10-20 seconds. Completes when you get command prompt back.

### STEP 6: Start Development Server
```powershell
npm run dev
```
**Wait:** 10-15 seconds. You'll see: `✓ Ready in XXXms`

---

## ✅ YOU'RE RUNNING!

Once Step 6 completes:

1. **Open Browser:** `http://localhost:3000`
2. **See:** Golf Legacy homepage 
3. **Test:** Click "Join Impact Circle"
4. **Success:** You can sign up! ✅

---

## 📝 ENVIRONMENT SETUP

Before Step 6, create `.env.local` file:

### 1. Create File
- In VS Code: `File → New File`
- Name it: `.env.local`
- Save in project root

### 2. Paste This Template
```env
# SUPABASE (from Step 4 output)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (copy full key from supabase start output)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (copy full key from supabase start output)

# STRIPE (from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_51234567890
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890
STRIPE_WEBHOOK_SECRET=whsec_1234567890

# EMAIL (optional - leave as-is if not using)
RESEND_API_KEY=re_1234567890
EMAILS_FROM=noreply@golflegacy.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Save File
- Press `Ctrl+S`
- File appears in left sidebar as `.env.local`

---

## 🧪 QUICK TESTING

### Test 1: Homepage Loads
```
✓ Visit http://localhost:3000
✓ See text "Your game elevates lives"
✓ See "Join Impact Circle" button
```

### Test 2: Signup Works
```
✓ Click "Join Impact Circle"
✓ Fill form (name, email, password)
✓ Click "Choose Charity"
✓ Select a charity
✓ Click "Create Account"
✓ See dashboard
```

### Test 3: Add Score
```
✓ Go to /dashboard/scores
✓ Click "Add Score"
✓ Enter: 42 (or any 1-45)
✓ Click "Add Score"
✓ See score in list
```

### Test 4: View Dashboard
```
✓ Go to /dashboard
✓ See stats (Peak Performance, Raised, etc.)
✓ See all sections loading
```

---

## 🛑 STOP/RESTART

### Stop Everything
```powershell
# Press Ctrl+C in terminal running npm run dev
# Then in another terminal:
supabase stop
```

### Restart Everything
```powershell
supabase start
npm run dev
```

### Reset Everything (caution!)
```powershell
supabase stop
supabase start
supabase db reset  # Deletes all test data!
npm run dev
```

---

## 🐛 IF SOMETHING GOES WRONG

### Error: "Cannot find module"
**Solution:**
```powershell
npm install
npm install @supabase/supabase-js @supabase/ssr
npm run dev
```

### Error: "Supabase not starting"
**Solution:**
```powershell
supabase status
# If shows: offline
supabase start
```

### Error: "Port 3000 already in use"
**Solution:**
```powershell
# Kill the process:
# Option 1: Close other terminal windows
# Option 2: Kill port specifically
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
npm run dev
```

### Error: "Not seeing database changes"
**Solution:**
```powershell
# Restart Supabase:
supabase stop
supabase start
supabase db reset
npm run dev
```

### Error in Browser: "Cannot GET /dashboard"
**Solution:**
```
✓ Sign up first at /auth/signup
✓ Then /dashboard will work
✓ If still fails, clear cookies: Ctrl+Shift+Del
```

---

## 📊 USEFUL ADDITIONAL COMMANDS

### View Logs
```powershell
supabase logs --follow
```

### Access Supabase CLI Help
```powershell
supabase --help
supabase db --help
```

### Check Node Version
```powershell
node --version
npm --version
```

### Build for Production
```powershell
npm run build
npm start
```

### Run Linter
```powershell
npm run lint
```

---

## 📱 TEST ON MOBILE (SAME NETWORK)

### Find Your IP Address
```powershell
ipconfig
```
Look for: `IPv4 Address: 192.168.X.X`

### Visit on Mobile
```
Browser: http://192.168.X.X:3000
```

Test all pages and buttons!

---

## ✨ YOU'RE READY!

Once `npm run dev` runs successfully:

| What | URL |
|------|-----|
| Homepage | `http://localhost:3000` |
| Sign Up | `http://localhost:3000/auth/signup` |
| Sign In | `http://localhost:3000/auth/login` |
| Dashboard | `http://localhost:3000/dashboard` |
| Admin | `http://localhost:3000/admin` |
| Charities | `http://localhost:3000/charities` |

---

## 📖 NEXT: READ DOCUMENTATION

After everything is running:

1. **TESTING_GUIDE.md** - Test every feature
2. **PROJECT_DOCUMENTATION.md** - Understand the full system
3. **SETUP_GUIDE.md** - Extended configuration options

---

**Version:** 1.0  
**Status:** ✅ Ready to Run  
**Last Updated:** March 2026

### 🚀 Happy coding!
