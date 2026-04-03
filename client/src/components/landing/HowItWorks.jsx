import React from 'react'
import { motion } from 'framer-motion'
import { FaDatabase, FaChartLine, FaUserCheck, FaRocket } from 'react-icons/fa'
import SectionTitle from '../common/SectionTitle'
import GlassCard from '../common/GlassCard'
import { staggerContainer, staggerItem } from '../../utils/motionVariants'

const HowItWorks = () => {
  const steps = [
    {
      icon: FaDatabase,
      number: '01',
      title: 'Market Data',
      description: 'Comprehensive job market analysis from 1M+ postings with real-time skill extraction.'
    },
    {
      icon: FaChartLine,
      number: '02',
      title: 'Intelligence',
      description: 'Advanced AI models identify demand trends, salary patterns, and emerging roles.'
    },
    {
      icon: FaUserCheck,
      number: '03',
      title: 'Your Profile',
      description: 'Rich skill assessment matched against target roles with precision scoring.'
    },
    {
      icon: FaRocket,
      number: '04',
      title: 'Growth Path',
      description: 'Personalized roadmaps with salary impact predictions and learning timelines.'
    }
  ]

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="section-container">
        <SectionTitle
          title="The Process"
          subtitle="Four elegantly designed steps to career mastery."
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative group"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent" />
                )}

                <GlassCard className="h-full">
                  {/* Step number */}
                  <div className="text-5xl font-black text-indigo-500/10 mb-8">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-indigo-400/30 flex items-center justify-center mb-5">
                    <Icon className="text-indigo-300 text-lg" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks