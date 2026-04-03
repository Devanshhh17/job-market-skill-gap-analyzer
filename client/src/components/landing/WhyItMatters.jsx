import React from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaLightbulb, FaChartLine, FaMedal } from 'react-icons/fa'
import SectionTitle from '../common/SectionTitle'
import GlassCard from '../common/GlassCard'
import GlowButton from '../common/GlowButton'
import { staggerContainer, staggerItem, revealOnScroll } from '../../utils/motionVariants'

const WhyItMatters = () => {
  const benefits = [
    {
      icon: FaTrophy,
      title: 'Career Excellence',
      description: 'Make strategic skill investments backed by real market data and salary impact projections.'
    },
    {
      icon: FaLightbulb,
      title: 'Smart Choices',
      description: 'Understand emerging opportunities before they become obvious to the broader market.'
    },
    {
      icon: FaChartLine,
      title: 'ROI Optimization',
      description: 'Align skill development with highest-demand, best-paying opportunities.'
    },
    {
      icon: FaMedal,
      title: 'Competitive Edge',
      description: 'Position yourself as a top candidate within your target market.'
    }
  ]

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="section-container">
        <SectionTitle
          title="Impact & Value"
          subtitle="Transform career decisions with confidence and clarity."
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group"
              >
                <GlassCard className="h-full">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 flex items-center justify-center group-hover:border-indigo-400/50 transition-all duration-300">
                      <Icon className="text-indigo-300 text-xl" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          {...revealOnScroll}
          className="premium-card p-8 sm:p-12 text-center mt-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Master Your Career?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who use Skillect to make smarter career decisions backed by data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#get-started"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlowButton className="px-8 py-4 text-lg">
                Start Your Analysis
              </GlowButton>
            </motion.a>
            <motion.a
              href="#learn-more"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlowButton variant="secondary" className="px-8 py-4 text-lg">
                Learn More
              </GlowButton>
            </motion.a>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
          >
            {[
              { stat: '1.2M+', label: 'Jobs Analyzed' },
              { stat: '94%', label: 'Accuracy Rate' },
              { stat: '240+', label: 'Skills Tracked' }
            ].map((item, idx) => (
              <div key={idx}>
                <motion.p
                  className="text-2xl md:text-3xl font-bold premium-accent mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  {item.stat}
                </motion.p>
                <p className="text-sm text-gray-400">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyItMatters