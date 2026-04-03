import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlowButton from '../components/common/GlowButton'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-8xl font-bold gradient-heading mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-8">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back to exploring job market insights.
        </p>
        <Link to="/">
          <GlowButton>
            Go Home
          </GlowButton>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound