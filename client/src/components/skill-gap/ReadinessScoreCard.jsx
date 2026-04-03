import React from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../common/GlassCard'

const ReadinessScoreCard = ({ score, demandScore }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! You\'re highly prepared for this role.'
    if (score >= 60) return 'Good foundation. Focus on the missing skills to improve.'
    return 'Significant skill gaps. Consider building fundamentals first.'
  }

  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-4 text-cyan-400">Readiness Assessment</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
            {score}%
          </div>
          <div className="text-sm text-gray-400 mb-4">Readiness Score</div>
          <p className="text-sm text-gray-300">
            {getScoreMessage(score)}
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold mb-2 text-purple-400">
            {demandScore}/10
          </div>
          <div className="text-sm text-gray-400 mb-4">Market Demand</div>
          <p className="text-sm text-gray-300">
            High demand for this role in the current market.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Skill Readiness</span>
          <span>{score}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-3 rounded-full ${
              score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>
    </GlassCard>
  )
}

export default ReadinessScoreCard