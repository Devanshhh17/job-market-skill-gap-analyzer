# Frontend & Backend Connection Guide

## Overview

Skillect uses a frontend-backend architecture:
- **Frontend**: React + Vite (port 5173)
- **Backend**: Node.js + Express (port 5000)
- **Database**: MongoDB

This guide explains how to connect them.

---

## Prerequisites

1. **Node.js** (v16+) - [Download](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local installation - [Download](https://www.mongodb.com/try/download/community)
   - Or MongoDB Atlas (cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)
3. **npm** or **yarn** package manager

---

## Architecture Diagram

```
┌─────────────────────┐
│  Browser Frontend   │
│  React + Vite       │
│  Port: 5173         │
└──────────┬──────────┘
           │ HTTP Requests
           │ (via Axios)
           │
┌──────────▼──────────┐
│  API Proxy (Vite)   │
│  /api → localhost:5000
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Backend API        │
│  Express.js         │
│  Port: 5000         │
│  Routes: /api/*     │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│    MongoDB          │
│    Database         │
│  localhost:27017    │
└─────────────────────┘
```

---

## Step 1: Backend Setup

### 1.1 Install Dependencies

```bash
cd server
npm install
```

### 1.2 Configure Environment Variables

The `server/.env` file should contain:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-market-analyzer
```

**For MongoDB Atlas (Cloud):**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-market-analyzer
```

### 1.3 Start MongoDB

#### Option A: Local MongoDB
```bash
# Windows (if installed)
mongod

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
- No setup needed - just ensure your connection string is correct

### 1.4 Start the Backend Server

```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### 1.5 Verify Backend is Running

Test the health check endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Step 2: Frontend Setup

### 2.1 Install Dependencies

```bash
cd client
npm install
```

### 2.2 Configure Environment Variables

A `.env` file already exists in `client/.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

**For Production:**
```bash
VITE_API_URL=https://your-api-domain.com/api
```

### 2.3 Start the Frontend Development Server

```bash
cd client
npm run dev
```

You should see:
```
  VITE v5.4.21  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Step 3: Verify Connection

### 3.1 Check API Proxy

The Vite dev server has a built-in proxy:

```javascript
// vite.config.js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

This means:
- Frontend requests to `/api/jobs` → Proxied to `http://localhost:5000/api/jobs`
- No CORS issues during development

### 3.2 Test API Connection

1. Open browser console (F12 or Cmd+Option+J)
2. Go to Dashboard page
3. Check Network tab:
   - Requests should show `/api/analytics/*`
   - Status should be 200 (success)

### 3.3 Verify Data Loading

**Dashboard page:**
- Should show KPI cards with data
- Charts should populate with real data
- "Market Intelligence" section should display

**Job Explorer page:**
- Should display job listings
- Filters should work
- Job details modal should show full job info

---

## Running Everything Together

### Option 1: Separate Terminals (Recommended)

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

**Terminal 3 (optional - Open Browser):**
```bash
npm run open
# or manually navigate to http://localhost:5173
```

### Option 2: Single Command (from root)

```bash
npm run dev
```

This uses `concurrently` to start both servers:
```bash
> skillect@1.0.0 dev
> concurrently "npm run server" "npm run client"

[0] > npm run server
[1] > npm run client
```

---

## API Endpoints Documented

### Jobs API

```
GET    /api/jobs                    # Get all jobs
GET    /api/jobs/:id                # Get job by ID
POST   /api/jobs                    # Create new job
POST   /api/jobs/seed              # Seed sample data
```

### Analytics API

```
GET    /api/analytics/overview      # Dashboard overview
GET    /api/analytics/top-skills    # Top skills ranking
GET    /api/analytics/top-tools     # Top tools ranking
GET    /api/analytics/salary-by-role
GET    /api/analytics/salary-by-skill
GET    /api/analytics/work-modes
GET    /api/analytics/experience-levels
GET    /api/analytics/role-distribution
GET    /api/analytics/top-locations
POST   /api/analytics/skill-gap     # Analyze skill gaps
GET    /api/analytics/recommendations/:role
```

### Upload API

```
POST   /api/upload/csv              # Upload job data CSV
```

---

## Troubleshooting

### Problem: "Cannot connect to backend"

**Solution:**
1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check if port 5000 is already in use: `netstat -ano | findstr :5000`
3. Kill process on port 5000: `taskkill /PID <PID> /F`

### Problem: "Cannot connect to MongoDB"

**Solution:**
1. Verify MongoDB is running
2. Check connection string in `.env`:
   - Local: `mongodb://localhost:27017/job-market-analyzer`
   - Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/job-market-analyzer`
3. Verify credentials if using Atlas
4. Test connection: `mongo mongodb://localhost:27017`

### Problem: "CORS error"

**Note:** During development, Vite's proxy handles CORS automatically. CORS only matters in production.

**For Production:**
Backend already has CORS enabled:
```javascript
app.use(cors())
```

### Problem: "API responses are empty"

**Solution:**
1. Seed sample data: 
   ```bash
   curl -X POST http://localhost:5000/api/jobs/seed
   ```
2. Upload CSV file via admin panel
3. Check MongoDB connection

---

## Environment Variables Reference

### Backend (`server/.env`)

| Variable | Value | Notes |
|----------|-------|-------|
| PORT | 5000 | Backend server port |
| MONGODB_URI | mongodb://localhost:27017/job-market-analyzer | MongoDB connection string |
| NODE_ENV | development | Set to 'production' for deployment |

### Frontend (`client/.env`)

| Variable | Value | Notes |
|----------|-------|-------|
| VITE_API_URL | http://localhost:5000/api | Backend API base URL |

---

## File Structure Reference

```
skillect/
├── client/
│   ├── .env                    # Frontend env variables
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js         # API client configuration
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx  # Fetches analytics data
│   │   │   ├── JobExplorer.jsx # Fetches job listings
│   │   │   └── SkillGapAnalyzer.jsx
│   │   └── hooks/
│   │       └── useFetchAnalytics.js
│   └── vite.config.js         # Proxy configuration
│
├── server/
│   ├── .env                    # Backend env variables
│   ├── index.js                # Main server file
│   ├── routes/                 # API routes
│   ├── controllers/            # Business logic
│   ├── models/                 # MongoDB models
│   └── config/
│       └── db.js               # MongoDB connection
│
└── package.json                # Root package
```

---

## Testing the Connection

### Manual API Testing

Use curl or Postman to test endpoints:

```bash
# Test health check
curl http://localhost:5000/api/health

# Get all jobs
curl http://localhost:5000/api/jobs

# Get analytics overview
curl http://localhost:5000/api/analytics/overview

# Get top skills
curl http://localhost:5000/api/analytics/top-skills
```

### Browser DevTools Testing

1. Open browser (http://localhost:5173)
2. Press F12 to open DevTools
3. Go to Network tab
4. Navigate to Dashboard
5. Observe API requests being made to `/api/analytics/*`
6. Check response status and data

---

## Production Deployment

### Backend Deployment (Example: Render/Railway)

1. Set environment variables:
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production

2. Deploy with: `npm run dev` or `npm start`

### Frontend Deployment (Example: Vercel/Netlify)

1. Build for production: `npm run build`
2. Deploy the `dist/` folder
3. Set environment variable:
   - `VITE_API_URL`: Your production backend URL
   - Example: `https://api.skillect-app.com/api`

### Database Deployment

Use MongoDB Atlas for cloud hosting:
1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update `MONGODB_URI` in both local and deployed backend

---

## Quick Commands Reference

```bash
# Install all dependencies
npm run install-all

# Start both frontend & backend
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Build frontend for production
cd client && npm run build

# Seed sample data
curl -X POST http://localhost:5000/api/jobs/seed
```

---

## Debugging

### Enable Verbose Logging

**Backend (`server/index.js`):**
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})
```

**Frontend (disable in production):**
```javascript
// In api.js
api.interceptors.request.use(config => {
  console.log('API Request:', config.url)
  return config
})
```

---

## Next Steps

1. ✅ Backend running on port 5000
2. ✅ Frontend running on port 5173
3. ✅ MongoDB connected
4. ✅ API endpoints working
5. 📊 **Now:**
   - Explore Dashboard to see analytics
   - Check Job Explorer for job listings
   - Test Skill Gap Analyzer
   - Upload CSV data via Admin panel

---

## Support

For issues or questions:
- Check the troubleshooting section above
- Review server logs: `npm run dev` output
- Check browser console for frontend errors
- Verify MongoDB connection string
- Ensure all required ports are available

---

**Last Updated**: April 3, 2026
**Project**: Skillect - Data Science Project
