import React from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../common/GlassCard'
import { staggerContainer, staggerItem } from '../../utils/motionVariants'

const FiltersPanel = ({ filters, onFilterChange }) => {
  const filterOptions = {
    role: ['All', 'Data Analyst', 'Data Scientist', 'ML Engineer', 'BI Analyst', 'Data Engineer', 'Business Analyst'],
    location: ['All', 'Remote', 'New York', 'San Francisco', 'London', 'Toronto', 'Austin'],
    workMode: ['All', 'Remote', 'Hybrid', 'On-site'],
    experienceLevel: ['All', 'Entry', 'Mid', 'Senior', 'Lead'],
    salaryRange: ['All', '0-50k', '50k-80k', '80k-120k', '120k+']
  }

  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">Filters & Refinement</h3>
        <p className="text-sm text-gray-400 mt-1">Narrow down opportunities to your preferences</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"
      >
        {Object.entries(filterOptions).map(([key, options]) => (
          <motion.div key={key} variants={staggerItem}>
            <label className="block text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wide">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <select
              value={filters?.[key] || 'All'}
              onChange={(e) => onFilterChange(key, e.target.value)}
              className="w-full input-glass bg-slate-800/40 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-400/50"
            >
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </motion.div>
        ))}
      </motion.div>
    </GlassCard>
  )
}

export default FiltersPanel