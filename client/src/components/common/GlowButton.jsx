import React from 'react'
import { motion } from 'framer-motion'

const GlowButton = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseClass = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold smooth-transition border'
  
  const variants = {
    primary: `${baseClass} btn-glow bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400/40 text-white hover:border-indigo-300/80 hover:from-indigo-500 hover:to-purple-500`,
    secondary: `${baseClass} btn-glow glass-interactive border-white/30 text-white hover:border-white/60 hover:shadow-lg hover:shadow-white/10`,
    outline: `${baseClass} btn-glow border-white/40 text-white hover:bg-white/10 hover:border-white/80 hover:shadow-lg hover:shadow-white/5`
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.97, y: 0 }}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default GlowButton