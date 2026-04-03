import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GlowButton from '../common/GlowButton'
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/motionVariants'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5"
        />
      </div>

      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center space-y-8 max-w-5xl mx-auto"
        >
          {/* Main Headline */}
          <motion.div variants={staggerItem}>
            <h1 className="premium-heading-lg text-balance">
              Navigate the Future of
              <span className="premium-accent block mt-2">Work Intelligence</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Premium AI-powered analytics for career mastery. Analyze skill gaps, predict market demand, and position yourself for the highest-impact opportunities with Apple-level polish and Awwwards-level elegance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/skill-gap">
              <GlowButton className="text-lg px-8 py-4">
                Start Analysis
              </GlowButton>
            </Link>
            <Link to="/dashboard">
              <GlowButton variant="secondary" className="text-lg px-8 py-4">
                Explore Insights
              </GlowButton>
            </Link>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            variants={staggerItem}
            className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 backdrop-blur-sm"
          >
            {[
              { number: '1.2M+', label: 'Job Postings Analyzed' },
              { number: '200+', label: 'Skills Tracked' },
              { number: '45%', label: 'Salary Insights Accuracy' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="glass-card p-6"
              >
                <p className="text-3xl md:text-4xl font-bold premium-accent mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-12"
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="premium-card p-8 max-w-3xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '1,245', label: 'Active Roles' },
                  { value: '9.2K', label: 'Candidates' },
                  { value: '87%', label: 'Match Rate' },
                  { value: '$125K', label: 'Avg Salary' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    className="text-center"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {item.value}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero