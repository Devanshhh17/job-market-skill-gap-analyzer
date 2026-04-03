import React from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../common/GlassCard'

const Recommendations = ({ skills }) => {
  if (!skills || skills.length === 0) return null

  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-4 text-cyan-400">Recommended Skills to Learn</h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-purple-900/20 border border-purple-800/50 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-300 font-semibold">{skill.name}</span>
              <span className="text-sm bg-cyan-600/20 text-cyan-400 px-2 py-1 rounded">
                Priority {skill.priority}/10
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Expected salary impact: +${skill.salaryImpact?.toLocaleString() || 0}
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

export default Recommendations