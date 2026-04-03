import React from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../common/GlassCard'

const GapSummary = ({ analysis }) => {
  if (!analysis) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">Skill Gap Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {analysis.matchedSkills?.length || 0}
            </div>
            <div className="text-sm text-gray-400">Matched Skills</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {analysis.missingSkills?.length || 0}
            </div>
            <div className="text-sm text-gray-400">Missing Skills</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold gradient-heading mb-2">
              {analysis.readinessScore || 0}%
            </div>
            <div className="text-sm text-gray-400">Readiness Score</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analysis.readinessScore || 0}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 h-3 rounded-full"
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default GapSummary