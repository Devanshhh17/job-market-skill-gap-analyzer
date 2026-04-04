import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Jobs API
export const jobsAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  seed: () => api.post('/jobs/seed'),
}

// Analytics API
export const analyticsAPI = {
  getOverview: () => api.get('/analytics/overview'),
  getTopSkills: () => api.get('/analytics/top-skills'),
  getTopTools: () => api.get('/analytics/top-tools'),
  getSalaryByRole: () => api.get('/analytics/salary-by-role'),
  getSalaryBySkill: () => api.get('/analytics/salary-by-skill'),
  getWorkModes: () => api.get('/analytics/work-modes'),
  getExperienceLevels: () => api.get('/analytics/experience-levels'),
  getRoleDistribution: () => api.get('/analytics/role-distribution'),
  getTopLocations: () => api.get('/analytics/top-locations'),
  analyzeSkillGap: (data) => api.post('/analytics/skill-gap', data),
  getRecommendations: (role) => api.get(`/analytics/recommendations/${role}`),
}

// Upload API
export const uploadAPI = {
  uploadCSV: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default api