const Job = require('../models/Job')

const aggregateByField = (jobs, field) => {
  const counts = {}
  jobs.forEach(job => {
    const values = Array.isArray(job[field]) ? job[field] : [job[field]]
    values.forEach(val => {
      if (!val) return
      counts[val] = (counts[val] || 0) + 1
    })
  })
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

// Calculate top skills across all jobs
const calculateTopSkills = async (jobsData = null) => {
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    return aggregateByField(jobsData, 'skills')
  }
  const result = await Job.aggregate([
    { $unwind: '$skills' },
    { $group: { _id: '$skills', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { name: '$_id', count: 1, _id: 0 } }
  ])
  return result
}

// Calculate top tools across all jobs
const calculateTopTools = async (jobsData = null) => {
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    return aggregateByField(jobsData, 'tools')
  }
  const result = await Job.aggregate([
    { $unwind: '$tools' },
    { $group: { _id: '$tools', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { name: '$_id', count: 1, _id: 0 } }
  ])
  return result
}

// Calculate average salary by role
const calculateSalaryByRole = async (jobsData = null) => {
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    const roleStats = {}
    jobsData.forEach(job => {
      if (!job.roleCategory || !job.salaryMin) return
      if (!roleStats[job.roleCategory]) {
        roleStats[job.roleCategory] = { total: 0, count: 0 }
      }
      roleStats[job.roleCategory].total += job.salaryMin
      roleStats[job.roleCategory].count += 1
    })
    return Object.entries(roleStats)
      .map(([role, stat]) => ({ role, salary: Math.round(stat.total / stat.count), count: stat.count }))
      .sort((a, b) => b.salary - a.salary)
  }

  const result = await Job.aggregate([
    {
      $match: {
        salaryMin: { $exists: true },
        roleCategory: { $exists: true }
      }
    },
    {
      $group: {
        _id: '$roleCategory',
        avgSalary: { $avg: '$salaryMin' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { avgSalary: -1 }
    },
    {
      $project: {
        role: '$_id',
        salary: { $round: ['$avgSalary', 0] },
        count: 1,
        _id: 0
      }
    }
  ])
  return result
}

// Calculate salary impact by skill
const calculateSalaryBySkill = async (jobsData = null) => {
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    const skillStats = {}
    jobsData.forEach(job => {
      if (!job.skills || !job.salaryMin) return
      job.skills.forEach(skill => {
        skillStats[skill] = skillStats[skill] || { total: 0, count: 0 }
        skillStats[skill].total += job.salaryMin
        skillStats[skill].count += 1
      })
    })
    return Object.entries(skillStats)
      .filter(([, stat]) => stat.count >= 5)
      .map(([name, stat]) => ({
        name,
        salary: Math.round(stat.total / stat.count),
        count: stat.count,
        demand: stat.count
      }))
      .sort((a, b) => b.salary - a.salary)
      .slice(0, 15)
  }

  const result = await Job.aggregate([
    { $unwind: '$skills' },
    {
      $match: {
        salaryMin: { $exists: true }
      }
    },
    {
      $group: {
        _id: '$skills',
        avgSalary: { $avg: '$salaryMin' },
        count: { $sum: 1 }
      }
    },
    {
      $match: { count: { $gte: 5 } }
    },
    {
      $sort: { avgSalary: -1 }
    },
    {
      $project: {
        name: '$_id',
        salary: { $round: ['$avgSalary', 0] },
        count: 1,
        demand: '$count',
        _id: 0
      }
    }
  ])
  return result.slice(0, 15)
}

// Calculate work mode distribution
const calculateWorkModes = async (jobsData = null) => {
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    return aggregateByField(jobsData, 'workMode')
  }
  const result = await Job.aggregate([
    { $group: { _id: '$workMode', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { name: '$_id', count: 1, _id: 0 } }
  ])
  return result
}

// Calculate experience level distribution
const calculateExperienceLevels = async (jobsData = null) => {
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    return aggregateByField(jobsData, 'experienceLevel').map(item => ({ level: item.name, count: item.count }))
  }
  const result = await Job.aggregate([
    { $group: { _id: '$experienceLevel', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { level: '$_id', count: 1, _id: 0 } }
  ])
  return result
}

// Calculate role distribution
const calculateRoleDistribution = async (jobsData = null) => {
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    return aggregateByField(jobsData, 'roleCategory')
  }
  const result = await Job.aggregate([
    { $group: { _id: '$roleCategory', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { name: '$_id', count: 1, _id: 0 } }
  ])
  return result
}

// Calculate top locations
const calculateTopLocations = async (jobsData = null) => {
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    return aggregateByField(jobsData, 'location').map(item => ({ location: item.name, count: item.count }))
  }
  const result = await Job.aggregate([
    { $group: { _id: '$location', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { location: '$_id', count: 1, _id: 0 } }
  ])
  return result
}

// Analyze skill gap for a specific role
const analyzeSkillGapLogic = async (targetRole, currentSkills, jobsData = null) => {
  let roleJobs = []
  if (Array.isArray(jobsData) && jobsData.length > 0) {
    roleJobs = jobsData.filter(job => job.roleCategory === targetRole)
  } else {
    roleJobs = await Job.find({ roleCategory: targetRole })
  }

  if (roleJobs.length === 0) {
    return {
      matchedSkills: [],
      missingSkills: [],
      readinessScore: 0,
      demandScore: 5,
      totalRequiredSkills: 0
    }
  }

  // Calculate required skills frequency
  const skillFrequency = {}
  roleJobs.forEach(job => {
    (job.skills || []).forEach(skill => {
      if (!skill) return
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1
    })
  })

  // Sort skills by frequency
  const requiredSkills = Object.entries(skillFrequency)
    .sort(([,a], [,b]) => b - a)
    .map(([skill, count]) => ({ name: skill, frequency: count }))

  // Find matched and missing skills
  const matchedSkills = currentSkills.filter(skill =>
    requiredSkills.some(req => req.name.toLowerCase().includes(skill.toLowerCase()))
  )

  const missingSkills = requiredSkills
    .filter(req => !currentSkills.some(skill =>
      req.name.toLowerCase().includes(skill.toLowerCase())
    ))
    .slice(0, 10)
    .map((skill, index) => ({
      name: skill.name,
      priority: Math.min(index + 1, 10)
    }))

  // Calculate readiness score
  const readinessScore = Math.round((matchedSkills.length / Math.max(requiredSkills.length, 1)) * 100)

  return {
    matchedSkills,
    missingSkills,
    readinessScore,
    demandScore: 8, // Mock demand score
    totalRequiredSkills: requiredSkills.length
  }
}

// Get skill recommendations for a role
const getSkillRecommendations = async (role, jobsData = null) => {
  const analysis = await analyzeSkillGapLogic(role, [], jobsData)
  return analysis.missingSkills.slice(0, 5).map(skill => ({
    ...skill,
    salaryImpact: Math.floor(Math.random() * 20000) + 5000 // Mock salary impact
  }))
}

module.exports = {
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
}