import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../common/SectionTitle'
import GlassCard from '../common/GlassCard'
import { staggerContainer, staggerItem, revealOnScroll } from '../../utils/motionVariants'

const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(timer)
  }, [target])

  return (
    <span>
      {typeof target === 'string' ? target : count.toLocaleString()}
      <span className="text-indigo-300">{suffix}</span>
    </span>
  )
}

const StatsPreview = () => {
  const stats = [
    { label: 'Jobs Analyzed', value: 1250, suffix: '+', trend: 'up' },
    { label: 'Market Skills', value: 240, suffix: '+', trend: 'up' },
    { label: 'Salary Premium', value: '32', suffix: '%', trend: 'up' },
    { label: 'Placement Match', value: '94', suffix: '%', trend: 'up' }
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle
          title="Market Snapshot"
          subtitle="Comprehensive intelligence across 1M+ job postings and career trajectories."
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group"
            >
              <GlassCard>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                    {stat.label}
                  </span>
                  {stat.trend === 'up' && (
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xs text-cyan-400 font-semibold"
                    >
                      ↑
                    </motion.div>
                  )}
                </div>

                <div className="text-4xl md:text-5xl font-black text-white mb-3">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>

                <div className="flex items-center gap-2">
                  <motion.div
                    className="flex-1 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                    style={{ originX: 0 }}
                  />
                  <span className="text-xs text-gray-500">100%</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsPreview