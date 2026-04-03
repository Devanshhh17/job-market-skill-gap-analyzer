import React from 'react'
import { motion } from 'framer-motion'

const JobFilters = ({ filters, onFilterChange }) => {
  const filterOptions = {
    location: ['All', 'Remote', 'New York', 'San Francisco', 'London', 'Toronto', 'Austin'],
    workMode: ['All', 'Remote', 'Hybrid', 'On-site'],
    experienceLevel: ['All', 'Entry', 'Mid', 'Senior', 'Lead'],
    salaryRange: ['All', '0-50k', '50k-80k', '80k-120k', '120k+']
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="frosted-panel p-6"
    >
      <div className="flex items-center mb-5">
        <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h3 className="text-lg font-semibold text-white">Refine Criteria</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="group">
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider group-focus-within:text-accent transition-colors">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="relative">
              <select
                value={filters[key] || 'All'}
                onChange={(e) => onFilterChange(key, e.target.value)}
                className="appearance-none w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent focus:bg-white/10 focus:ring-1 focus:ring-accent transition-all cursor-pointer"
              >
                {options.map(option => (
                  <option key={option} value={option} className="bg-[#0f0f17]">{option}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default JobFilters