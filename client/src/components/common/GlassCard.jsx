import React from 'react'
import { motion } from 'framer-motion'
import { revealOnScroll, liftOnHover } from '../../utils/motionVariants'

const GlassCard = ({ children, className = '', elevated = false, ...props }) => {
  const cardClass = elevated ? 'premium-card' : 'glass-card'
  
  return (
    <motion.div
      {...revealOnScroll}
      {...(elevated && liftOnHover)}
      className={`${cardClass} p-6 sm:p-8 relative z-0 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard