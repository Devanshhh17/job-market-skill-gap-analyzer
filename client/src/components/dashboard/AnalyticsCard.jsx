import React from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../common/GlassCard'

const AnalyticsCard = ({ title, value, subtitle, icon, trend }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          <div className="text-3xl opacity-80">
            {icon}
          </div>
        </div>
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span className={`mr-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
            </span>
            <span className="text-gray-500">vs last month</span>
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}

export default AnalyticsCard