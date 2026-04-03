const Job = require('../models/Job')
const sampleJobs = require('../data/jobs.json')
const {
  calculateTopSkills,
  calculateTopTools,
  calculateSalaryByRole,
  calculateSalaryBySkill,
  calculateWorkModes,
  calculateExperienceLevels,
  calculateRoleDistribution,
  calculateTopLocations,
  analyzeSkillGapLogic,
  getSkillRecommendations
} = require('../utils/analyticsHelpers')

// GET /api/analytics/overview
const getOverview = async (req, res) => {
  try {
    // Use sample data for demo
    const totalJobs = sampleJobs.length
    const salaries = sampleJobs.filter(job => job.salaryMin).map(job => job.salaryMin)
    const avgSalary = salaries.length > 0 ? salaries.reduce((a, b) => a + b, 0) / salaries.length : 0
    const topSkill = calculateTopSkills(sampleJobs)[0]?.name || 'N/A'
    const remoteJobs = sampleJobs.filter(job => job.workMode === 'Remote').length

    res.json({
      totalJobs,
      avgSalary: Math.round(avgSalary),
      topSkill,
      remoteJobs,
      remotePercentage: totalJobs > 0 ? Math.round((remoteJobs / totalJobs) * 100) : 0
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/top-skills
const getTopSkills = async (req, res) => {
  try {
    const skills = await calculateTopSkills(sampleJobs)
    res.json(skills.slice(0, 10))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/top-tools
const getTopTools = async (req, res) => {
  try {
    const tools = await calculateTopTools(sampleJobs)
    res.json(tools.slice(0, 10))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/salary-by-role
const getSalaryByRole = async (req, res) => {
  try {
    const salaries = await calculateSalaryByRole(sampleJobs)
    res.json(salaries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/salary-by-skill
const getSalaryBySkill = async (req, res) => {
  try {
    const salaries = await calculateSalaryBySkill(sampleJobs)
    res.json(salaries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/work-modes
const getWorkModes = async (req, res) => {
  try {
    const workModes = await calculateWorkModes(sampleJobs)
    res.json(workModes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/experience-levels
const getExperienceLevels = async (req, res) => {
  try {
    const levels = await calculateExperienceLevels(sampleJobs)
    res.json(levels)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/role-distribution
const getRoleDistribution = async (req, res) => {
  try {
    const distribution = await calculateRoleDistribution(sampleJobs)
    res.json(distribution)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/top-locations
const getTopLocations = async (req, res) => {
  try {
    const locations = await calculateTopLocations(sampleJobs)
    res.json(locations.slice(0, 10))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/analytics/skill-gap
const analyzeSkillGap = async (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body
    const analysis = await analyzeSkillGapLogic(targetRole, currentSkills)
    res.json(analysis)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/analytics/recommendations/:role
const getRecommendations = async (req, res) => {
  try {
    const { role } = req.params
    const recommendations = await getSkillRecommendations(role, sampleJobs)
    res.json(recommendations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getOverview,
  getTopSkills,
  getTopTools,
  getSalaryByRole,
  getSalaryBySkill,
  getWorkModes,
  getExperienceLevels,
  getRoleDistribution,
  getTopLocations,
  analyzeSkillGap,
  getRecommendations
}