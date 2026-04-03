import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ size = 'md', text = 'Processing Intelligence...' }) => {
  const containerClasses = {
    sm: 'p-4 gap-4',
    md: 'p-6 gap-6',
    lg: 'p-8 gap-8 min-h-[400px]'
  }

  return (
    <div className={`w-full flex flex-col items-center justify-center ${containerClasses[size]} frosted-panel relative overflow-hidden my-8`}>
      {/* Animated shimmer overlay */}
      <motion.div
        animate={{ x: ['-200%', '200%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Core AI Core Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-accent/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-primary/40"
          />
          
          {/* Pulsing center */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent shadow-[0_0_20px_rgba(34,211,238,0.6)]"
          />
        </div>

        {text && (
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent uppercase tracking-widest mb-2">
              {text}
            </h3>
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </div>
  )
}

export default Loader