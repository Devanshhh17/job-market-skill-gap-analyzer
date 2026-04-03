# Skillect - Technical Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER (React)                     │
├─────────────────────────────────────────────────────────────────┤
│  Dashboard │ Analytics │ Skill Gap Analyzer │ Job Explorer      │
│            │   Charts   │   Recommendations │ Admin Upload      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    Axios HTTP Requests
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    API LAYER (Express.js)                       │
├──────────────────────────────────────────────────────────────────┤
│  /api/jobs/*         │  /api/analytics/*     │  /api/upload/*   │
│  ├─ GET /           │  ├─ /overview         │  └─ /csv         │
│  ├─ GET /:id        │  ├─ /top-skills       │                  │
│  ├─ POST /          │  ├─ /top-tools        │                  │
│  └─ POST /seed      │  ├─ /salary-by-role   │                  │
│                      │  ├─ /salary-by-skill  │                  │
│                      │  ├─ /skill-gap        │                  │
│                      │  └─ /recommendations  │                  │
└──────────────────────┬───────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        │              │              │
┌───────▼──┐  ┌────────▼────────┐  ┌─▼──────────┐
│ ANALYTICS│  │  DATA PIPELINE  │  │  MODELS   │
│ ENGINE   │  │  & PROCESSING   │  │           │
├──────────┤  ├─────────────────┤  ├───────────┤
│ • Agg    │  │ • CSV Parser    │  │ • Job     │
│ • Stats  │  │ • Cleaning      │  │ • Skill   │
│ • Scoring│  │ • Normalization │  │ • User    │
│ • Rec    │  │ • Validation    │  │ • etc     │
└──────────┘  └─────────────────┘  └───────────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
                Mongoose ODM
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼────────────────────────────▼───────┐
│         DATABASE LAYER (MongoDB)           │
├────────────────────────────────────────────┤
│             Collections:                   │
│  ├─ jobs                                   │
│  ├─ users (future)                         │
│  ├─ recommendations (cache)                │
│  └─ analytics_cache                        │
└────────────────────────────────────────────┘
```

## Data Flow Pipeline

### 1. Data Ingestion Flow

```
CSV Upload
    │
    ├─→ multer (File handling)
    │
    ├─→ csvParser.js (Parse CSV)
    │       └─ Extract rows & columns
    │
    ├─→ cleaningHelpers.js (Data Cleaning)
    │       ├─ Normalize skills
    │       ├─ Standardize tools
    │       ├─ Validate salary ranges
    │       └─ Handle missing values
    │
    ├─→ Mongoose Model (Job.js)
    │       └─ Schema validation
    │
    ├─→ MongoDB (Storage)
    │
    └─→ Index Creation
        └─ Optimize for queries
```

### 2. Analytics Computation Flow

```
API Request: /api/analytics/top-skills
    │
    ├─→ analyticsController.js
    │
    ├─→ analyticsHelpers.js
    │       ├─ Check cache (Redis/Memory)
    │       │
    │       └─ If miss:
    │           ├─ Fetch from MongoDB
    │           ├─ Execute aggregation pipeline
    │           ├─ Process results
    │           ├─ Calculate statistics
    │           ├─ Store in cache
    │           └─ Return to client
    │
    ├─→ Response (JSON)
    │
    └─→ Frontend (Visualization)
        └─ Recharts renders data
```

### 3. Skill Gap Analysis Flow

```
User Input:
  - Current Skills
  - Target Role

    │
    ├─→ analyticsController.js
    │       └─ Validate input
    │
    ├─→ scoringHelpers.js
    │       │
    │       ├─ Get target role requirements
    │       │   └─ Query jobs by role
    │       │
    │       ├─ Match current vs required skills
    │       │   ├─ Find matched skills
    │       │   └─ Find missing skills
    │       │
    │       ├─ Score missing skills
    │       │   ├─ Priority = Importance × Frequency × Salary_Impact
    │       │   └─ Sort by priority descending
    │       │
    │       ├─ Calculate readiness %
    │       │   └─ Matched / Required × 100
    │       │
    │       ├─ Generate recommendations
    │       │   ├─ Prerequisite order
    │       │   ├─ Learning paths
    │       │   └─ Expected impact
    │       │
    │       └─ Create response object
    │
    └─→ Frontend
        ├─ Display gap summary
        ├─ Show matched skills
        ├─ List missing skills (prioritized)
        ├─ Show recommendations
        └─ Interactive learning path
```

## Component Architecture

### Analytics Helpers (`analyticsHelpers.js`)

```javascript
Exported Functions:
├─ calculateTopSkills()
├─ calculateTopTools()
├─ calculateSalaryByRole()
├─ calculateSalaryBySkill()
├─ calculateWorkModeDistribution()
├─ calculateExperienceDistribution()
├─ calculateRoleDistribution()
├─ calculateTopLocations()
├─ calculateLocationSalaryAnalysis()
├─ calculateSkillCoOccurrence()
└─ getRecommendations()
```

### Scoring Helpers (`scoringHelpers.js`)

```javascript
Exported Functions:
├─ analyzeSkillGap()
│   ├─ Input: currentSkills[], targetRole
│   ├─ Process: Match, gap, score
│   └─ Output: Gap analysis object
│
└─ scoreSkill()
    ├─ Input: skill, jobData
    ├─ Process: Calculate importance
    └─ Output: Priority score
```

### Cleaning Helpers (`cleaningHelpers.js`)

```javascript
Exported Functions:
├─ normalizeSkills()
├─ standardizeTools()
├─ cleanSalaryData()
├─ handleMissingValues()
├─ validateJobData()
└─ deduplicateJobs()
```

## Database Schema

### Jobs Collection

```javascript
{
  _id: ObjectId,
  title: String,
  roleCategory: String,
  company: String,
  location: String,
  workMode: 'remote' | 'hybrid' | 'on-site',
  experience: 'entry' | 'mid' | 'senior',
  skills: [String],           // Normalized skill names
  tools: [String],            // Standardized tool names
  salaryMin: Number,          // In USD
  salaryMax: Number,          // In USD
  description: String,
  jobUrl: String,
  postedDate: Date,           // Job posting date
  createdAt: Date,            // Added to DB date
  updatedAt: Date
}
```

### Indexes for Performance

```javascript
// Single field indexes
db.jobs.createIndex({ skills: 1 })
db.jobs.createIndex({ tools: 1 })
db.jobs.createIndex({ roleCategory: 1 })
db.jobs.createIndex({ workMode: 1 })
db.jobs.createIndex({ location: 1 })
db.jobs.createIndex({ experience: 1 })

// Compound indexes
db.jobs.createIndex({ 
  roleCategory: 1,
  salaryMin: 1, 
  salaryMax: 1 
})

// Text index (future full-text search)
db.jobs.createIndex({ title: "text", description: "text" })
```

## API Response Schema

### Analytics Response Example

```json
{
  "success": true,
  "data": {
    "topSkills": [
      { "name": "Python", "count": 850, "importance": 0.89 },
      { "name": "SQL", "count": 720, "importance": 0.85 }
    ],
    "stats": {
      "totalJobs": 1000,
      "total_unique_skills": 240,
      "average_skills_per_job": 5.2,
      "total_unique_tools": 180
    },
    "metadata": {
      "timestamp": "2024-04-03T12:00:00Z",
      "cached": false,
      "computation_ms": 1240
    }
  }
}
```

### Skill Gap Response Example

```json
{
  "success": true,
  "data": {
    "userSkills": ["Python", "SQL", "Excel"],
    "targetRole": "Data Scientist",
    "matchedSkills": ["Python", "SQL"],
    "missingSkills": [
      { "name": "Machine Learning", "priority": 0.95, "salary_impact": "+$25000" },
      { "name": "Statistics", "priority": 0.92, "salary_impact": "+$20000" }
    ],
    "readinessPercentage": 65.3,
    "recommendations": [
      { "skill": "Machine Learning", "resources": [...], "duration": "3-4 months" }
    ],
    "analysis": {
      "roleAverageSkills": 8,
      "roleAverageSalary": 135000,
      "yourCurrentLevel": "intermediate"
    }
  }
}
```

## Caching Strategy

### Cached Data
```
Key: "analytics:top-skills"
Value: Array of top 20 skills
TTL: 5 minutes

Key: "analytics:salary-by-role"
Value: Role salary statistics
TTL: 10 minutes

Key: "suggestions:role:{roleId}"
Value: Pre-computed recommendations
TTL: 24 hours
```

## Performance Optimization

### Query Optimization
- MongoDB aggregation pipeline (server-side computation)
- Result pagination (limit 50, skip)
- Selective field projection (`projection`)
- Index utilization for filtering

### Caching
- In-memory cache for frequently accessed metrics
- TTL-based cache invalidation
- Cache warming on server startup

### Frontend Optimization
- React lazy loading for charts
- Memoization of expensive computations
- Virtual scrolling for large lists

## Error Handling

### HTTP Status Codes
```
200: OK - Successful request
400: Bad Request - Invalid input
404: Not Found - Resource not found
500: Server Error - Computation failed
503: Service Unavailable - Database unreachable
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "INVALID_ROLE",
    "message": "Target role not found in database",
    "details": { "providedRole": "InvalidRole" }
  }
}
```

## Deployment Architecture (Future)

```
┌─────────────┐
│   Client    │ (Vercel/Netlify)
│  (Frontend) │
└──────┬──────┘
       │
   Internet
       │
┌──────▼──────┐      ┌──────────────┐
│   API       │◄────►│  MongoDB     │
│  (Backend)  │      │  (Atlas)     │
│ (Railway/   │      │              │
│  Render)    │      └──────────────┘
└─────────────┘
```

---

**Architecture Last Updated**: April 3, 2026
