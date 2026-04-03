# Skillect - Data Science Project

**A comprehensive full-stack data science project for market intelligence and career optimization.**

Skillect analyzes job market data using advanced data science techniques to help professionals understand market demands, identify skill gaps, and make data-driven career decisions.

## Project Scope: Data Science Implementation

This is a **production-grade data science project** featuring:

### Data Engineering
- **ETL Pipeline**: Extract job data, Transform with normalization, Load into MongoDB
- **CSV Ingestion**: Automated pipeline for batch job data uploads
- **Data Validation**: Quality checks for missing values, outliers, and anomalies
- **Data Normalization**: Standardized skill names, tool classifications, salary ranges

### Exploratory Data Analysis (EDA)
- **Distribution Analysis**: Skills, tools, roles, locations, experience levels, work modes
- **Correlation Studies**: Salary correlations with skills, experience, and roles
- **Trend Detection**: Demand forecasting for emerging technologies
- **Statistical Summaries**: Mean, median, percentiles, standard deviation

### Feature Engineering
- **Skill Importance Scoring**: Weighted by frequency, salary impact, and growth
- **Demand Metrics**: Calculate skill scarcity vs demand ratios
- **Role Clustering**: Group similar positions by skills and requirements
- **Market Indicators**: KPIs like average salary, skill diversity, experience requirements

### Recommendation Engine
- **Personalized Analysis**: Match user skills against market requirements
- **Gap Identification**: Quantify missing skills with priority scores
- **Learning Paths**: Suggest skills based on target roles and career trajectory
- **Competitive Positioning**: Benchmark individual profile against market

### Data Visualization & Insights
- **Interactive Dashboards**: Real-time analytics with Recharts
- **Statistical Charts**: Salary distributions, skill frequencies, role breakdowns
- **Heatmaps**: Skill-salary correlations matrix
- **Performance Metrics**: KPI cards with trend indicators

## Why This is a Data Science Project

This project goes beyond a simple dashboard by implementing real data science methodologies:

- **Data Cleaning**: Normalizes skills, tools, salaries, and handles missing values
- **Exploratory Data Analysis**: Frequency analysis, trend identification, statistical insights
- **Feature Engineering**: Skill importance scoring, demand metrics
- **Recommendation Engine**: Personalized skill gap analysis and learning priorities
- **Statistical Analysis**: Salary correlations, role distributions, market trends

## Features

- **Beautiful Premium UI**: Dark futuristic design with 3D animations and glassmorphism
- **Comprehensive Analytics**: KPI dashboards, interactive charts, and insights
- **Skill Gap Analysis**: Personalized assessment of current skills vs market needs
- **Job Explorer**: Search and filter through job postings
- **Admin Panel**: Upload CSV data and manage job listings
- **Real-time Insights**: Dynamic charts and statistical summaries

## Tech Stack

### Frontend
- React 18 with Vite
- JavaScript (ES6+)
- React Router DOM
- Framer Motion
- Tailwind CSS
- Recharts
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JavaScript
- dotenv
- cors
- multer
- csv-parser

## Folder Structure

```
job-market-skill-gap-analyzer/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── data/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── data/
│   ├── middleware/
│   ├── .env.example
│   ├── package.json
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-market-skill-gap-analyzer
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   - Copy `server/.env.example` to `server/.env`
   - Update the MongoDB connection string:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/job-market-analyzer
     ```

4. **Start MongoDB**
   - If using local MongoDB, ensure it's running on port 27017

5. **Seed sample data**
   - The application will automatically seed sample data when the server starts if the database is empty

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start both the backend server and frontend client concurrently.

### Individual Services
```bash
# Start backend only
npm run server

# Start frontend only
npm run client
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Environment Variables

Create a `.env` file in the `server` directory with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Seeding Instructions

Sample job data is automatically seeded when the server starts if no jobs exist in the database. The sample dataset includes:

- 50+ realistic job postings
- Various roles: Data Analyst, Data Scientist, ML Engineer, etc.
- Diverse skills and tools
- Salary ranges and locations

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs with filtering
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job
- `POST /api/jobs/seed` - Seed sample data

### Analytics
- `GET /api/analytics/overview` - Overview statistics
- `GET /api/analytics/top-skills` - Top skills analysis
- `GET /api/analytics/top-tools` - Top tools analysis
- `GET /api/analytics/salary-by-role` - Salary by role
- `GET /api/analytics/salary-by-skill` - Salary by skill
- `GET /api/analytics/work-modes` - Work mode distribution
- `GET /api/analytics/experience-levels` - Experience distribution
- `GET /api/analytics/role-distribution` - Role distribution
- `GET /api/analytics/top-locations` - Top locations
- `POST /api/analytics/skill-gap` - Skill gap analysis
- `GET /api/analytics/recommendations/:role` - Skill recommendations

### Upload
- `POST /api/upload/csv` - Upload CSV file

## Future Improvements

- [ ] User authentication and profiles
- [ ] Advanced ML models for better recommendations
- [ ] Real-time job scraping integration
- [ ] Export functionality for reports
- [ ] Advanced filtering and search
- [ ] Mobile app version
- [ ] Integration with LinkedIn/Indeed APIs
- [ ] Predictive analytics for career paths

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.