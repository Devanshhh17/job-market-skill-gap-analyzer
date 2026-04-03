# Skillect - Quick Data Science Reference

## Key Algorithms & Concepts

### 1. Skill Gap Analysis Formula

```
Gap Analysis Score = Σ(MissingSkill_i × Importance_i × Urgency_i)

Where:
- MissingSkill_i = 1 if skill i is missing, 0 otherwise
- Importance_i = Frequency(i) × Salary_Impact(i) × Growth_Rate(i)
- Urgency_i = Demand_Ratio(i) × Market_Scarcity(i)
```

### 2. Skill Importance Scoring

```
Priority_Score = (Frequency / Max_Frequency) × 0.4 +
                 (Avg_Salary / Max_Salary) × 0.35 +
                 (Growth_Rate / Max_Growth) × 0.15 +
                 (Competition_Score / Max_Competition) × 0.1
```

### 3. Readiness Percentage

```
Readiness % = (Matched_Skills / Total_Required_Skills) × 100
```

### 4. Skill Co-occurrence Analysis

```
Co_Occurrence_Index = Count(Skill_A & Skill_B) / Total_Jobs
```

## Aggregation Pipelines (MongoDB)

### Top Skills Query
```javascript
db.jobs.aggregate([
  { $unwind: '$skills' },
  { $group: { _id: '$skills', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 20 }
])
```

### Salary by Role Analysis
```javascript
db.jobs.aggregate([
  { $group: {
      _id: '$roleCategory',
      avgSalary: { $avg: { $add: ['$salaryMin', '$salaryMax'] } },
      minSalary: { $min: '$salaryMin' },
      maxSalary: { $max: '$salaryMax' },
      count: { $sum: 1 }
    }
  },
  { $sort: { avgSalary: -1 } }
])
```

### Skill-Salary Correlation
```javascript
db.jobs.aggregate([
  { $unwind: '$skills' },
  { $group: {
      _id: '$skills',
      avgSalary: { $avg: { $add: ['$salaryMin', '$salaryMax'] } },
      count: { $sum: 1 }
    }
  },
  { $sort: { avgSalary: -1 } },
  { $match: { count: { $gte: 10 } } }
])
```

## Statistical Methods Applied

| Method | Use Case | Formula |
|--------|----------|---------|
| Mean | Average salary, experience | Σx / n |
| Median | Salary distribution | Middle value when sorted |
| Mode | Most common skill | Highest frequency |
| Std Dev | Salary spread | √(Σ(x-μ)²/n) |
| Percentile | Salary ranking | Value at k% position |
| Correlation | Skill-salary relation | Cov(X,Y) / (σ_x × σ_y) |

## Data Transformations

### Normalization (0-1 Scale)
```javascript
Normalized_Value = (Value - Min) / (Max - Min)
```

### Min-Max Scaling
```javascript
Scaled_Value = (Value - Min_Value) / (Max_Value - Min_Value)
```

### Logarithmic Transformation (for skewed distributions)
```javascript
Log_Transformed = log(Value + 1)
```

## Performance Metrics

### For Recommendations
- **Precision**: TP / (TP + FP)
- **Recall**: TP / (TP + FN)
- **F1-Score**: 2 × (Precision × Recall) / (Precision + Recall)

### For Skills
- **Coverage**: Different skills recommended / Total skills
- **Concentration**: How diverse vs focused recommendations are

## Database Indexes for Performance

```javascript
// Essential indexes for analytics queries
db.jobs.createIndex({ skills: 1 })
db.jobs.createIndex({ tools: 1 })
db.jobs.createIndex({ roleCategory: 1 })
db.jobs.createIndex({ salaryMin: 1, salaryMax: 1 })
db.jobs.createIndex({ location: 1 })
db.jobs.createIndex({ workMode: 1 })
```

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Top Skills (aggregation) | O(n log n) | O(k) where k=result size |
| Skill Gap Analysis | O(n + m) | O(n + m) |
| Salary Statistics | O(n) | O(1) |
| Recommendations | O(n log n) | O(n) |

## Data Quality Checks

```javascript
Validation Rules:
- skills: Array, non-empty, normalized
- tools: Array, non-empty, normalized  
- roleCategory: String, non-null
- salaryMin: Number, 0 <= salaryMin <= salaryMax
- salaryMax: Number, reasonable ceiling
- location: String, standardized
- experience: 'entry' | 'mid' | 'senior'
- workMode: 'remote' | 'hybrid' | 'on-site'
```

## Visualization Metrics

### Chart Selection Guide
```
Single Value → KPI Card
Ranking data → Bar Chart
Over time → Line Chart
Proportions → Pie/Donut Chart
Two variables → Scatter Plot
Categories → Heatmap
```

## Error Handling & Edge Cases

```javascript
Edge Cases Handled:
1. Empty datasets → Return default metrics
2. Single value datasets → Avoid division by zero
3. Missing skills → Treat as 0 frequency
4. Salary with 0 → Filter out in averages
5. Unknown roles → Categorize as 'Other'
6. Duplicate entries → Deduplicate before analysis
```

## Caching Strategy

```
Cached Data (5 minute TTL):
- Top 20 skills
- Top 20 tools
- Average salaries by role
- Experience distribution
- Work mode distribution
```

## Future ML Enhancements

### Supervised Learning
```
Problem: Salary Prediction
Input Features: Skills, Experience, Role, Location
Output: Predicted Salary
Algorithms: Linear Regression, Random Forest, Gradient Boosting
```

### Unsupervised Learning
```
Problem: Role Clustering
Algorithm: K-Means or Hierarchical Clustering
Features: Skill vectors, Salary ranges, Experience requirements
Output: Similar role groups
```

### NLP
```
Problem: Job Description Understanding
Algorithm: TF-IDF, Word2Vec, BERT embeddings
Use: Extract implicit skills, requirements
```

---

**Last Updated**: April 3, 2026
**Project**: Skillect - Data Science Project
