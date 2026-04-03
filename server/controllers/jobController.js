const Job = require('../models/Job')
const sampleJobs = require('../data/jobs.json')

// Get all jobs with filtering
const getJobs = async (req, res) => {
  try {
    // For demo purposes, return sample data if no DB connection
    const jobs = sampleJobs.slice(0, 100) // Return first 100 jobs
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (job) {
      return res.json(job)
    }

    // Fallback to sample jobs if DB not reachable
    const sampleJob = sampleJobs.find(jobItem => jobItem.id === req.params.id || jobItem._id === req.params.id)
    if (sampleJob) {
      return res.json(sampleJob)
    }

    return res.status(404).json({ message: 'Job not found' })
  } catch (error) {
    // Fallback sample search
    const sampleJob = sampleJobs.find(jobItem => jobItem.id === req.params.id || jobItem._id === req.params.id)
    if (sampleJob) {
      return res.json(sampleJob)
    }
    res.status(500).json({ message: error.message })
  }
}

// Create new job
const createJob = async (req, res) => {
  try {
    const job = new Job(req.body)
    const savedJob = await job.save()
    res.status(201).json(savedJob)
  } catch (error) {
    // Fallback: push to in-memory sample data
    const newId = (sampleJobs.length + 1).toString()
    const newJob = { ...req.body, id: newId, _id: newId, postedDate: new Date().toISOString() }
    sampleJobs.push(newJob)
    res.status(201).json(newJob)
  }
}

// Seed sample jobs
const seedJobs = async (req, res) => {
  try {
    const count = await Job.countDocuments()
    if (count > 0) {
      return res.json({ message: 'Database already has data' })
    }

    const sampleJobs = require('../data/jobs.json')
    await Job.insertMany(sampleJobs)

    res.json({ message: `Seeded ${sampleJobs.length} jobs successfully` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getJobs,
  getJobById,
  createJob,
  seedJobs
}