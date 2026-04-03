# Connection Status Checklist

Use this checklist to verify that your frontend and backend are properly connected.

## Step 1: Backend Status ✅/❌

- [ ] **MongoDB Running**
  - Local: Open terminal and run `mongod`
  - Cloud: Verify MongoDB Atlas cluster is active
  - Test: `mongo mongodb://localhost:27017` (should connect)

- [ ] **Backend Server Started**
  - Terminal: `cd server && npm run dev`
  - Expected output: `Server running on port 5000`
  - Status: ✅ Green if you see this message

- [ ] **Database Connected**
  - Expected output after server starts: `MongoDB Connected: localhost`
  - If error: Check `.env` file for correct MONGODB_URI

- [ ] **Health Check Working**
  ```bash
  curl http://localhost:5000/api/health
  ```
  - Expected response: `{"status":"OK","message":"Server is running"}`

---

## Step 2: Frontend Status ✅/❌

- [ ] **Frontend Dependencies Installed**
  ```bash
  cd client && npm install
  ```
  - Check: No red errors in terminal

- [ ] **Environment File Created**
  - File: `client/.env`
  - Content: `VITE_API_URL=http://localhost:5000/api`
  - Check: File exists with correct URL

- [ ] **Frontend Dev Server Started**
  - Terminal: `cd client && npm run dev`
  - Expected output: `Local: http://localhost:5173/`
  - Status: ✅ Navigate to this URL in browser

---

## Step 3: Connection Verification ✅/❌

### 3.1 Browser Console (Dev Tools)

1. Open Portal: `http://localhost:5173`
2. Press `F12` to open DevTools
3. Go to **Network** tab
4. Navigate to **Dashboard** page
5. Observe API calls:
   - [ ] Multiple requests to `/api/analytics/*`
   - [ ] Status codes: **200** (success) or **304** (cached)
   - [ ] No **404** (not found) or **500** (server error)

### 3.2 Dashboard Data Loading

Navigate to **Dashboard** and verify:

- [ ] **KPI Cards Load**
  - Total Jobs visible
  - Active Skills visible
  - Average Salary visible
  - Market Growth visible

- [ ] **Charts Populate with Data**
  - Top Skills chart shows data
  - Salary by Role chart displays
  - Work Mode distribution visible
  - Role distribution chart shows data
  - Location insights visible

- [ ] **Recent Jobs Preview Loads**
  - Job list appears
  - Job titles visible
  - Skill requirements shown

### 3.3 Job Explorer

Navigate to **Job Explorer** and verify:

- [ ] **Jobs Load Successfully**
  - Job cards appear
  - Job counts reasonable (not 0)
  - Job titles readable

- [ ] **Search/Filter Works**
  - Type in search: jobs filter
  - Select skills: jobs update
  - Select location: jobs filter
  - No console errors

- [ ] **Job Details Modal Opens**
  - Click job card
  - Modal appears with full details
  - Modal closes when clicking X

---

## Step 4: Detailed API Response Verification ✅/❌

### Test Each Endpoint

Open DevTools Console (Ctrl+Shift+J) and run:

```javascript
// Fetch from frontend local API
fetch('/api/health')
  .then(r => r.json())
  .then(d => console.log('Health:', d))

fetch('/api/jobs')
  .then(r => r.json())
  .then(d => console.log('Jobs:', d))

fetch('/api/analytics/overview')
  .then(r => r.json())
  .then(d => console.log('Overview:', d))

fetch('/api/analytics/top-skills')
  .then(r => r.json())
  .then(d => console.log('Top Skills:', d))
```

Expected results:
- [ ] All endpoints return status 200
- [ ] Data objects are populated (not empty)
- [ ] No CORS errors
- [ ] No network timeouts

---

## Step 5: Error Diagnosis ✅/❌

If something isn't working, check:

### Backend Errors

Look for these in server terminal:

```
❌ ERROR: connect ECONNREFUSED
  → MongoDB not running

❌ ERROR: Cannot find /api/health handler
  → Express routes not loaded

❌ ERROR: Port 5000 already in use
  → Another process using port 5000
```

**Solutions:**
1. Start MongoDB: `mongod`
2. Kill port 5000: `taskkill /PID <PID> /F` (Windows)
3. Check `.env` configuration

### Frontend Errors

Check browser DevTools Console for:

```
❌ GET http://localhost:5000/api/health 404
  → Backend not running

❌ CORS error: Access-Control-Allow-Origin
  → CORS not enabled on backend (should be auto-fixed)

❌ GET http://localhost:5000/api/jobs failed
  → Check API endpoint exists on backend
```

**Solutions:**
1. Verify backend is running on port 5000
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh page (Ctrl+Shift+R)

---

## Step 6: Component-Specific Checks ✅/❌

### Dashboard Page

- [ ] "Market Intelligence" header visible
- [ ] 4 KPI cards show numbers
- [ ] All 8 charts have data (not empty/loading forever)
- [ ] Recent jobs table populates
- [ ] No error message visible

**If Error Shows:**
Look for red text with suggestions:
- "Cannot connect to backend"
- "MongoDB may not be running"
- "Please ensure backend is running on port 5000"

### Job Explorer Page

- [ ] Job list shows items
- [ ] Job count > 0
- [ ] Filter panel interactive
- [ ] Search functional
- [ ] Click job → modal opens

**If No Jobs Show:**
1. Seed data: `curl -X POST http://localhost:5000/api/jobs/seed`
2. Upload CSV via admin panel
3. Check MongoDB has jobs collection

### Navigation

- [ ] All navbar links clickable
- [ ] Pages load without errors
- [ ] Smooth transitions between pages

---

## Step 7: Full Integration Test ✅/❌

### Scenario: Complete User Journey

1. [ ] Open `http://localhost:5173`
2. [ ] See landing page (no errors)
3. [ ] Click "Dashboard" → loads analytics
4. [ ] Click "Job Explorer" → shows jobs
5. [ ] Search for skill → jobs filter
6. [ ] Click job → details modal
7. [ ] Click "Account" → features page
8. [ ] Click "Get Started" → skill gap analyzer
9. [ ] Select role → shows analysis
10. [ ] All pages interactive, no console errors

---

## Performance Checks ✅/❌

### Network Performance (DevTools Network Tab)

- [ ] Dashboard loads in < 2 seconds
- [ ] API responses all return within 500ms
- [ ] No failed requests (all green 200s)
- [ ] Total data transfer < 1MB

### Memory/CPU

- [ ] Browser tab responsive (not frozen)
- [ ] Scrolling smooth
- [ ] Charts animate smoothly
- [ ] No lag when filtering

---

## Production Readiness Checklist ✅/❌

Before deploying to production:

- [ ] All API endpoints tested with real data
- [ ] Error handling working (shows helpful messages)
- [ ] Loading states visible while fetching
- [ ] CORS properly configured on backend
- [ ] Environment variables set correctly
- [ ] MongoDB backups enabled
- [ ] Frontend built without warnings: `npm run build`
- [ ] No console errors in production build

---

## Quick Fix Commands

If something breaks, try these:

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear browser cache
# DevTools → Application → Clear Storage → Clear Site Data

# Restart everything fresh
Ctrl+C (stop servers)
npm run dev (restart)
```

---

## Database Status

Check what's in MongoDB:

```bash
# Connect to MongoDB
mongo mongodb://localhost:27017/job-market-analyzer

# View collections
show collections

# Count jobs
db.jobs.countDocuments()

# View one job
db.jobs.findOne()

# Exit
exit
```

Expected:
- [ ] Have `jobs` collection
- [ ] Jobs count > 0
- [ ] Job documents have fields: title, role, skills, salary, etc.

---

## Summary Status

| Component | Status | Notes |
|-----------|--------|-------|
| MongoDB | ✅/❌ | Running on 27017 |
| Backend | ✅/❌ | Running on 5000 |
| Frontend | ✅/❌ | Running on 5173 |
| API Proxy | ✅/❌ | Vite proxy configured |
| Dashboard | ✅/❌ | Loads analytics data |
| Job Explorer | ✅/❌ | Shows job listings |
| Skill Gap | ✅/❌ | Ready to connect |
| Admin Panel | ✅/❌ | CSV upload ready |

---

## Next Steps When All ✅

1. Explore different features
2. Test with different filters
3. Upload your own job data CSV
4. Check analytics accuracy
5. Deploy to production
6. Monitor performance
7. Gather user feedback

---

**Troubleshooting Guide:** See `FRONTEND_BACKEND_CONNECTION.md`
**API Documentation:** See `server/routes/` files
**Frontend Code:** See `client/src/services/api.js`

