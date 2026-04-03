import React from 'react'
import { motion } from 'framer-motion'
import { FaChartBar, FaSearch, FaUserCheck, FaBrain, FaDatabase, FaRocket } from 'react-icons/fa'
import SectionTitle from '../common/SectionTitle'
import GlassCard from '../common/GlassCard'
import { staggerContainer, staggerItem } from '../../utils/motionVariants'

const Features = () => {
  const features = [
    {
      icon: FaChartBar,
      title: 'Market Intelligence',
      description: 'Real-time analytics on talent demand, salary trends, and skill evolution across the industry.'
    },
    {
      icon: FaSearch,
      title: 'Job Discovery',
      description: 'Explore opportunities with advanced filtering, skill matching, and confidence scoring.'
    },
    {
      icon: FaUserCheck,
      title: 'Skill Gap Analysis',
      description: 'AI-powered assessment of your skills against target roles with precise growth recommendations.'
    },
    {
      icon: FaBrain,
      title: 'AI Insights',
      description: 'Intelligent recommendations for high-impact skills and career acceleration paths.'
    },
    {
      icon: FaDatabase,
      title: 'Data Engine',
      description: 'Proprietary analytics on 1M+ postings for comprehensive market intelligence.'
    },
    {
      icon: FaRocket,
      title: 'Career Roadmap',
      description: 'Personalized growth strategies designed to maximize opportunities and earning potential.'
    }
  ]

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="section-container">
        <SectionTitle
          title="Capabilities"
          accent="Built for Excellence"
          subtitle="Premium analytics designed for careers that matter."
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group"
              >
                <GlassCard className="h-full glass-interactive group-hover:border-indigo-500/40">
                  {/* Icon Container */}
                  <motion.div 
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-indigo-400/30 flex items-center justify-center mb-5 group-hover:border-indigo-400/60 glow-border group-hover:shadow-lg group-hover:shadow-indigo-500/20 smooth-transition"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="text-indigo-300 text-lg group-hover:text-indigo-200 smooth-transition" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-indigo-200 smooth-transition">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 smooth-transition">
                    {feature.description}
                  </p>

                  {/* Hover arrow */}
                  <motion.div
                    className="mt-6 text-indigo-400 opacity-0 group-hover:opacity-100 smooth-transition"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-sm font-medium group-hover:text-indigo-300 smooth-transition">Learn more →</span>
                  </motion.div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Features