import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { motion } from 'framer-motion'

const JobSearchBar = ({ searchTerm, onSearchChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative frosted-panel p-2 transition-all duration-300 ${isFocused ? 'shadow-[0_0_30px_rgba(34,211,238,0.2)] border-accent/40' : 'border-white/10'}`}
    >
      <div className="relative flex items-center">
        <FaSearch className={`absolute left-4 transition-colors duration-300 ${isFocused ? 'text-accent' : 'text-zinc-500'}`} size={18} />
        <input
          type="text"
          placeholder="Ask AI or search jobs by title, company, or skills..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-4 py-3.5 bg-transparent border-none text-white placeholder-zinc-500 focus:outline-none text-lg"
        />
        {searchTerm && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default JobSearchBar