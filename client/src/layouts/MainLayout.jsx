import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import BackgroundEffects from '../components/common/BackgroundEffects'

const MainLayout = ({ children }) => {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <BackgroundEffects />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout