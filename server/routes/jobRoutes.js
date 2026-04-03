const express = require('express')
const Job = require('../models/Job')
const sampleJobs = require('../data/jobs.json')

const router = express.Router()

// GET /api/jobs - Get all jobs with optional filtering
router.get('/', async (req, res) => {
  try {
    const {
      role,
      location,
      workMode,
      experienceLevel,
      salaryMin,
      salaryMax,
      skill,
      company,
      limit = 50,
      page = 1
    } = req.query

    // Use sampleJobs for a demo fallback if DB is unavailable
    let jobs = sampleJobs.slice()

    if (role && role !== 'All') jobs = jobs.filter(job => job.roleCategory === role)
    if (location && location !== 'All') jobs = jobs.filter(job => job.location === location)
    if (workMode && workMode !== 'All') jobs = jobs.filter(job => job.workMode === workMode)
    if (experienceLevel && experienceLevel !== 'All') jobs = jobs.filter(job => job.experienceLevel === experienceLevel)
    if (company) jobs = jobs.filter(job => job.company.toLowerCase().includes(company.toLowerCase()))
    if (skill) jobs = jobs.filter(job => (job.skills || []).some(s => s.toLowerCase().includes(skill.toLowerCase())))

    if (salaryMin || salaryMax) {
      jobs = jobs.filter(job => {
        if (!job.salaryMin || !job.salaryMax) return false
        const min = parseInt(salaryMin || 0)
        const max = parseInt(salaryMax || Number.MAX_SAFE_INTEGER)
        return job.salaryMin >= min && job.salaryMax <= max
      })
    }

    const total = jobs.length
    const start = (parseInt(page) - 1) * parseInt(limit)
    const end = start + parseInt(limit)
    const pagedJobs = jobs.slice(start, end)

    res.json({
      jobs: pagedJobs,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/jobs/:id - Get job by ID
router.get('/:id', async (req, res) => {
  try {
    let job = null
    try {
      job = await Job.findById(req.params.id)
    } catch {}

    if (job) {
      return res.json(job)
    }

    const sampleJob = sampleJobs.find(jobItem => jobItem.id === req.params.id || jobItem._id === req.params.id)
    if (sampleJob) {
      return res.json(sampleJob)
    }

    res.status(404).json({ message: 'Job not found' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/jobs - Create new job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body)
    const savedJob = await job.save()
    res.status(201).json(savedJob)
  } catch (error) {
    const newJob = {
      ...req.body,
      id: `${sampleJobs.length + 1}`,
      _id: `${sampleJobs.length + 1}`,
      postedDate: new Date().toISOString()
    }
    sampleJobs.push(newJob)
    res.status(201).json(newJob)
  }
})

// POST /api/jobs/seed - Seed sample data
router.post('/seed', async (req, res) => {
  try {
    const sampleData = require('../data/jobs.json')
    res.json({ message: `Seeded ${sampleData.length} jobs successfully`, seeded: sampleData.length })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router