const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  workMode: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    default: 'Remote'
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract'],
    default: 'Full-time'
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior', 'Lead'],
    default: 'Mid'
  },
  salaryMin: {
    type: Number,
    min: 0
  },
  salaryMax: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD']
  },
  skills: [{
    type: String,
    trim: true
  }],
  tools: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    trim: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    default: 'Manual',
    trim: true
  },
  roleCategory: {
    type: String,
    enum: [
      'Data Analyst',
      'Data Scientist',
      'Machine Learning Engineer',
      'BI Analyst',
      'BI Developer',
      'Data Engineer',
      'Business Analyst'
    ]
  }
}, {
  timestamps: true
})

// Indexes for better query performance
jobSchema.index({ title: 'text', company: 'text', description: 'text' })
jobSchema.index({ skills: 1 })
jobSchema.index({ location: 1 })
jobSchema.index({ workMode: 1 })
jobSchema.index({ experienceLevel: 1 })
jobSchema.index({ roleCategory: 1 })
jobSchema.index({ postedDate: -1 })

// Virtual for salary range
jobSchema.virtual('salaryRange').get(function() {
  if (this.salaryMin && this.salaryMax) {
    return `${this.currency} ${this.salaryMin.toLocaleString()} - ${this.salaryMax.toLocaleString()}`
  }
  return 'Not specified'
})

// Method to check if job matches skills
jobSchema.methods.matchesSkills = function(userSkills) {
  return userSkills.some(skill =>
    this.skills.some(jobSkill =>
      jobSkill.toLowerCase().includes(skill.toLowerCase())
    )
  )
}

module.exports = mongoose.model('Job', jobSchema)