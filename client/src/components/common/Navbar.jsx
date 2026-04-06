import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChartLine, FaSearch, FaUserCheck, FaCog, FaRocket, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home', icon: FaRocket },
    { path: '/dashboard', label: 'Dashboard', icon: FaChartLine },
    { path: '/skill-gap', label: 'Gap Analysis', icon: FaUserCheck },
    { path: '/jobs', label: 'Explore', icon: FaSearch },
    { path: '/admin', label: 'Admin', icon: FaCog }
  ]

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent border-b border-white/0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center gap-2 transition-all duration-300"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-black text-lg">S</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-none">Skillect</p>
              <p className="text-gray-400 text-xs">Intelligence</p>
            </div>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className={`text-sm transition-all duration-300 ${
                      isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'
                    }`} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Right - Mobile Menu Toggle & Get Started */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden sm:block"
            >
              <Link
                to="/skill-gap"
                className="premium-button text-sm px-4 py-2"
              >
                <span>Start</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`text-lg transition-all duration-300 ${
                      isActive ? 'text-cyan-400' : 'text-gray-400'
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="pt-4 sm:hidden">
                <Link
                  to="/skill-gap"
                  className="w-full flex justify-center premium-button text-sm px-4 py-3"
                >
                  <span>Start Analysis</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar