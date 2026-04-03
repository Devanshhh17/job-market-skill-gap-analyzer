import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/motionVariants'

const SectionTitle = ({ title, subtitle, accent, align = 'center' }) => {
  const alignClass = align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'
  const alignMargin = align === 'center' ? 'mx-auto' : ''

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className={`mb-16 sm:mb-20 relative ${alignMargin} max-w-4xl`}
    >
      {/* Decorative line */}
      {align === 'center' && (
        <motion.div
          variants={staggerItem}
          className="flex justify-center mb-6"
        >
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full" />
        </motion.div>
      )}

      {/* Main Title */}
      <motion.h2
        variants={staggerItem}
        className={`premium-heading-lg ${alignClass}`}
      >
        {title}
        {accent && (
          <span className="premium-accent"> {accent}</span>
        )}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className={`mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl ${alignMargin && 'sm:leading-relaxed'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionTitle