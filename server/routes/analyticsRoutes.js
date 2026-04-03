const express = require('express')
const {
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
} = require('../controllers/analyticsController')

const router = express.Router()

// GET /api/analytics/overview
router.get('/overview', getOverview)

// GET /api/analytics/top-skills
router.get('/top-skills', getTopSkills)

// GET /api/analytics/top-tools
router.get('/top-tools', getTopTools)

// GET /api/analytics/salary-by-role
router.get('/salary-by-role', getSalaryByRole)

// GET /api/analytics/salary-by-skill
router.get('/salary-by-skill', getSalaryBySkill)

// GET /api/analytics/work-modes
router.get('/work-modes', getWorkModes)

// GET /api/analytics/experience-levels
router.get('/experience-levels', getExperienceLevels)

// GET /api/analytics/role-distribution
router.get('/role-distribution', getRoleDistribution)

// GET /api/analytics/top-locations
router.get('/top-locations', getTopLocations)

// POST /api/analytics/skill-gap
router.post('/skill-gap', analyzeSkillGap)

// GET /api/analytics/recommendations/:role
router.get('/recommendations/:role', getRecommendations)

module.exports = router