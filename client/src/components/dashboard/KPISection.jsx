import React from 'react'
import { motion } from 'framer-motion'
import TiltCard from '../common/TiltCard'
import { staggerContainer, staggerItem } from '../../utils/motionVariants'

const KPISection = ({ data }) => {
  const kpis = [
    { label: 'Total Jobs', value: data.totalJobs?.toLocaleString() || '0', prefix: '', color: 'from-blue-400 to-cyan-400', shadow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]' },
    { label: 'Avg Salary', value: `${(data.avgSalary / 1000).toFixed(0)}K`, prefix: '$', color: 'from-green-400 to-emerald-400', shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
    { label: 'Top Skill', value: data.topSkill || 'Python', prefix: '', color: 'from-purple-400 to-primary', shadow: 'shadow-[0_0_15px_rgba(139,92,246,0.3)]' },
    { label: 'Remote Jobs', value: `${data.remotePercentage || 68}%`, prefix: '', color: 'from-orange-400 to-rose-400', shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]' }
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          variants={staggerItem}
          className="h-full"
        >
          <TiltCard className="h-full flex flex-col justify-center text-center p-6 border-white/10 group">
            <span className="text-sm font-semibold uppercase text-zinc-400 tracking-widest block mb-4 group-hover:text-zinc-300 transition-colors">
              {kpi.label}
            </span>
            <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent mb-2`}>
              {kpi.prefix}{kpi.value}
            </div>
            <motion.div
              className={`mt-4 h-1.5 rounded-full bg-gradient-to-r ${kpi.color} mx-auto block w-0 ${kpi.shadow}`}
              initial={{ width: 0 }}
              whileInView={{ width: '60%' }}
              transition={{ delay: 0.3 + index * 0.1, duration: 1 }}
            />
          </TiltCard>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default KPISection