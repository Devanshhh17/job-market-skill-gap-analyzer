const fs = require('fs')
const csv = require('csv-parser')
const { cleanJobData } = require('./cleaningHelpers')

// Parse CSV file and return cleaned job data
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const cleanedJob = cleanJobData(data)
        if (cleanedJob) {
          results.push(cleanedJob)
        }
      })
      .on('end', () => {
        resolve(results)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

// Validate CSV headers
const validateCSVHeaders = (filePath, requiredHeaders = ['title', 'company']) => {
  return new Promise((resolve, reject) => {
    const headers = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('headers', (headerList) => {
        headers.push(...headerList.map(h => h.toLowerCase().trim()))
      })
      .on('end', () => {
        const missingHeaders = requiredHeaders.filter(header =>
          !headers.includes(header)
        )

        if (missingHeaders.length > 0) {
          reject(new Error(`Missing required headers: ${missingHeaders.join(', ')}`))
        } else {
          resolve(headers)
        }
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

// Generate CSV template
const generateCSVTemplate = () => {
  const headers = [
    'title',
    'company',
    'location',
    'workMode',
    'employmentType',
    'experienceLevel',
    'salaryMin',
    'salaryMax',
    'currency',
    'skills',
    'tools',
    'description',
    'roleCategory',
    'postedDate',
    'source'
  ]

  const sampleData = [
    {
      title: 'Senior Data Scientist',
      company: 'Tech Corp',
      location: 'Remote',
      workMode: 'Remote',
      employmentType: 'Full-time',
      experienceLevel: 'Senior',
      salaryMin: '120000',
      salaryMax: '150000',
      currency: 'USD',
      skills: 'Python, Machine Learning, SQL, TensorFlow',
      tools: 'Jupyter, AWS, Docker',
      description: 'We are looking for a Senior Data Scientist...',
      roleCategory: 'Data Scientist',
      postedDate: '2024-01-15',
      source: 'LinkedIn'
    }
  ]

  return { headers, sampleData }
}

module.exports = {
  parseCSV,
  validateCSVHeaders,
  generateCSVTemplate
}