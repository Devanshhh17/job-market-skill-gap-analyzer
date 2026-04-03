export const formatSalary = (min, max, currency = 'USD') => {
  if (!min && !max) return 'Not specified'
  if (min && max) {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
  }
  if (min) return `${currency} ${min.toLocaleString()}+`
  if (max) return `Up to ${currency} ${max.toLocaleString()}`
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatPercentage = (value, total) => {
  if (!total) return '0%'
  return `${((value / total) * 100).toFixed(1)}%`
}

export const formatSkillList = (skills, max = 3) => {
  if (!skills || skills.length === 0) return []
  if (skills.length <= max) return skills
  return [...skills.slice(0, max), `+${skills.length - max} more`]
}

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formatRoleName = (role) => {
  return role.split(' ').map(capitalizeFirst).join(' ')
}