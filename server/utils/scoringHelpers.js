// Scoring algorithms for various metrics

// Calculate market demand score for a skill (0-10)
const calculateMarketDemandScore = (skillFrequency, totalJobs) => {
  const frequency = skillFrequency / totalJobs
  if (frequency >= 0.8) return 10
  if (frequency >= 0.6) return 8
  if (frequency >= 0.4) return 6
  if (frequency >= 0.2) return 4
  if (frequency >= 0.1) return 2
  return 1
}

// Calculate role readiness score (0-100)
const calculateRoleReadinessScore = (matchedSkills, requiredSkills) => {
  if (requiredSkills.length === 0) return 100
  return Math.round((matchedSkills.length / requiredSkills.length) * 100)
}

// Calculate skill importance score based on frequency and salary correlation
const calculateSkillImportanceScore = (frequency, avgSalary, overallAvgSalary) => {
  const frequencyScore = Math.min(frequency / 10, 1) * 50
  const salaryBonus = avgSalary > overallAvgSalary ? 30 : 0
  const salaryMultiplier = Math.min(avgSalary / overallAvgSalary, 2) * 20

  return Math.round(frequencyScore + salaryBonus + salaryMultiplier)
}

// Calculate salary influence score for a skill
const calculateSalaryInfluenceScore = (skillSalary, overallAvgSalary) => {
  const ratio = skillSalary / overallAvgSalary
  if (ratio >= 1.5) return 10
  if (ratio >= 1.3) return 8
  if (ratio >= 1.1) return 6
  if (ratio >= 0.9) return 4
  return 2
}

// Calculate overall skill score combining multiple factors
const calculateOverallSkillScore = (demandScore, importanceScore, salaryScore) => {
  return Math.round((demandScore * 0.4) + (importanceScore * 0.4) + (salaryScore * 0.2))
}

// Rank skills by priority for learning
const rankSkillsByPriority = (skills) => {
  return skills
    .map(skill => ({
      ...skill,
      priority: calculateOverallSkillScore(
        skill.demandScore || 5,
        skill.importanceScore || 5,
        skill.salaryScore || 5
      )
    }))
    .sort((a, b) => b.priority - a.priority)
}

// Calculate learning priority based on multiple factors
const calculateLearningPriority = (skill, userLevel = 'beginner') => {
  let basePriority = skill.frequency || 1

  // Adjust for user level
  const levelMultipliers = {
    beginner: 1,
    intermediate: 1.2,
    advanced: 1.5
  }

  basePriority *= levelMultipliers[userLevel] || 1

  // Adjust for salary impact
  if (skill.salaryImpact) {
    basePriority *= (1 + skill.salaryImpact / 100000)
  }

  return Math.round(basePriority)
}

module.exports = {
  calculateMarketDemandScore,
  calculateRoleReadinessScore,
  calculateSkillImportanceScore,
  calculateSalaryInfluenceScore,
  calculateOverallSkillScore,
  rankSkillsByPriority,
  calculateLearningPriority
}