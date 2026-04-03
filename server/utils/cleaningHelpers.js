// Data cleaning and normalization utilities

// Normalize skill names to standard format
const normalizeSkill = (skill) => {
  if (!skill || typeof skill !== 'string') return null

  const normalized = skill.trim().toLowerCase()

  // Common skill name mappings
  const skillMappings = {
    'py': 'Python',
    'python3': 'Python',
    'python 3': 'Python',
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'ts': 'TypeScript',
    'typescript': 'TypeScript',
    'sql': 'SQL',
    'my sql': 'MySQL',
    'postgre sql': 'PostgreSQL',
    'postgre': 'PostgreSQL',
    'mongo': 'MongoDB',
    'mongodb': 'MongoDB',
    'react.js': 'React',
    'reactjs': 'React',
    'node.js': 'Node.js',
    'nodejs': 'Node.js',
    'ml': 'Machine Learning',
    'machine learning': 'Machine Learning',
    'ai': 'Artificial Intelligence',
    'artificial intelligence': 'Artificial Intelligence',
    'data viz': 'Data Visualization',
    'data visualization': 'Data Visualization',
    'etl': 'ETL',
    'elt': 'ELT',
    'aws': 'AWS',
    'amazon web services': 'AWS',
    'azure': 'Azure',
    'microsoft azure': 'Azure',
    'gcp': 'Google Cloud Platform',
    'google cloud': 'Google Cloud Platform'
  }

  return skillMappings[normalized] || skill.trim()
}

// Normalize tool names
const normalizeTool = (tool) => {
  if (!tool || typeof tool !== 'string') return null

  const normalized = tool.trim().toLowerCase()

  const toolMappings = {
    'jupyter': 'Jupyter',
    'jupyter notebook': 'Jupyter',
    'jupyter lab': 'Jupyter',
    'colab': 'Google Colab',
    'google colab': 'Google Colab',
    'vscode': 'VS Code',
    'visual studio code': 'VS Code',
    'pycharm': 'PyCharm',
    'intellij': 'IntelliJ IDEA',
    'webstorm': 'WebStorm',
    'sublime': 'Sublime Text',
    'atom': 'Atom',
    'vim': 'Vim',
    'emacs': 'Emacs',
    'excel': 'Excel',
    'google sheets': 'Google Sheets',
    'powerbi': 'Power BI',
    'power bi': 'Power BI',
    'tableau': 'Tableau',
    'looker': 'Looker',
    'qlik': 'Qlik',
    'spotfire': 'Spotfire'
  }

  return toolMappings[normalized] || tool.trim()
}

// Clean and validate salary fields
const cleanSalary = (salaryStr) => {
  if (!salaryStr) return null

  // Remove currency symbols and extra text
  const cleaned = salaryStr.toString().replace(/[^0-9.-]/g, '')

  const num = parseFloat(cleaned)
  return isNaN(num) || num <= 0 ? null : Math.round(num)
}

// Clean location field
const cleanLocation = (location) => {
  if (!location || typeof location !== 'string') return 'Remote'

  const cleaned = location.trim()

  // Standardize common locations
  const locationMappings = {
    'new york': 'New York',
    'ny': 'New York',
    'nyc': 'New York',
    'san francisco': 'San Francisco',
    'sf': 'San Francisco',
    'los angeles': 'Los Angeles',
    'la': 'Los Angeles',
    'austin': 'Austin',
    'seattle': 'Seattle',
    'chicago': 'Chicago',
    'boston': 'Boston',
    'london': 'London',
    'toronto': 'Toronto',
    'vancouver': 'Vancouver',
    'remote': 'Remote',
    'work from home': 'Remote',
    'wfh': 'Remote'
  }

  return locationMappings[cleaned.toLowerCase()] || cleaned
}

// Clean role category
const cleanRoleCategory = (role) => {
  if (!role || typeof role !== 'string') return null

  const cleaned = role.trim().toLowerCase()

  const roleMappings = {
    'data analyst': 'Data Analyst',
    'data scientist': 'Data Scientist',
    'machine learning engineer': 'Machine Learning Engineer',
    'ml engineer': 'Machine Learning Engineer',
    'bi analyst': 'BI Analyst',
    'business intelligence analyst': 'BI Analyst',
    'bi developer': 'BI Developer',
    'data engineer': 'Data Engineer',
    'business analyst': 'Business Analyst',
    'ba': 'Business Analyst'
  }

  return roleMappings[cleaned] || role.trim()
}

// Clean work mode
const cleanWorkMode = (mode) => {
  if (!mode || typeof mode !== 'string') return 'Remote'

  const cleaned = mode.trim().toLowerCase()

  if (cleaned.includes('remote')) return 'Remote'
  if (cleaned.includes('hybrid')) return 'Hybrid'
  if (cleaned.includes('on-site') || cleaned.includes('onsite') || cleaned.includes('office')) return 'On-site'

  return 'Remote' // Default
}

// Clean experience level
const cleanExperienceLevel = (level) => {
  if (!level || typeof level !== 'string') return 'Mid'

  const cleaned = level.trim().toLowerCase()

  if (cleaned.includes('entry') || cleaned.includes('junior') || cleaned.includes('beginner')) return 'Entry'
  if (cleaned.includes('mid') || cleaned.includes('intermediate')) return 'Mid'
  if (cleaned.includes('senior') || cleaned.includes('experienced')) return 'Senior'
  if (cleaned.includes('lead') || cleaned.includes('principal') || cleaned.includes('staff')) return 'Lead'

  return 'Mid' // Default
}

// Main function to clean job data from CSV or manual entry
const cleanJobData = (jobData) => {
  try {
    const cleaned = {
      title: jobData.title?.trim() || '',
      company: jobData.company?.trim() || '',
      location: cleanLocation(jobData.location),
      workMode: cleanWorkMode(jobData.workMode),
      employmentType: jobData.employmentType?.trim() || 'Full-time',
      experienceLevel: cleanExperienceLevel(jobData.experienceLevel),
      salaryMin: cleanSalary(jobData.salaryMin || jobData.salary),
      salaryMax: cleanSalary(jobData.salaryMax),
      currency: jobData.currency?.trim() || 'USD',
      skills: [],
      tools: [],
      description: jobData.description?.trim() || '',
      postedDate: jobData.postedDate ? new Date(jobData.postedDate) : new Date(),
      source: jobData.source?.trim() || 'CSV',
      roleCategory: cleanRoleCategory(jobData.roleCategory || jobData.role)
    }

    // Clean skills array
    if (jobData.skills) {
      const skillsStr = Array.isArray(jobData.skills) ? jobData.skills.join(',') : jobData.skills
      cleaned.skills = skillsStr.split(',')
        .map(skill => normalizeSkill(skill))
        .filter(skill => skill !== null)
    }

    // Clean tools array
    if (jobData.tools) {
      const toolsStr = Array.isArray(jobData.tools) ? jobData.tools.join(',') : jobData.tools
      cleaned.tools = toolsStr.split(',')
        .map(tool => normalizeTool(tool))
        .filter(tool => tool !== null)
    }

    // Validate required fields
    if (!cleaned.title || !cleaned.company) {
      return null // Skip invalid records
    }

    return cleaned
  } catch (error) {
    console.error('Error cleaning job data:', error)
    return null
  }
}

// Remove duplicates based on title, company, and posted date
const removeDuplicates = async (jobs) => {
  const seen = new Set()
  return jobs.filter(job => {
    const key = `${job.title}-${job.company}-${job.postedDate}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

module.exports = {
  normalizeSkill,
  normalizeTool,
  cleanSalary,
  cleanLocation,
  cleanRoleCategory,
  cleanWorkMode,
  cleanExperienceLevel,
  cleanJobData,
  removeDuplicates
}