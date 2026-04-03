import React from 'react'
import { motion } from 'framer-motion'

const MatchedSkills = ({ skills }) => {
  if (!skills || skills.length === 0) return null

  return (
    <div className="frosted-panel p-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Matched Skills
      </h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-green-900/10 to-cyan-900/10 border border-green-500/20 rounded-xl hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-shadow"
          >
            <span className="text-green-300 font-medium">{skill}</span>
            <div className="text-sm font-semibold text-green-500/80 uppercase tracking-wider">
              ✓ Verified
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MatchedSkills