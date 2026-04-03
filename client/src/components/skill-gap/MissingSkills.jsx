import React from 'react'
import { motion } from 'framer-motion'

const MissingSkills = ({ skills }) => {
  if (!skills || skills.length === 0) return null

  return (
    <div className="frosted-panel p-6 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent flex items-center">
        <svg className="w-5 h-5 mr-2 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Missing Skills
      </h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-900/10 to-red-900/10 border border-rose-500/20 rounded-xl hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-shadow"
          >
            <span className="text-rose-300 font-medium">{skill.name}</span>
            <div className="text-xs font-semibold text-rose-500/80 uppercase tracking-wider">
              Priority: {skill.priority}/10
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MissingSkills