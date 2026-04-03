import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SkillGapAnalyzer from './pages/SkillGapAnalyzer'
import JobExplorer from './pages/JobExplorer'
import AdminUpload from './pages/AdminUpload'
import NotFound from './pages/NotFound'

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skill-gap" element={<SkillGapAnalyzer />} />
        <Route path="/jobs" element={<JobExplorer />} />
        <Route path="/admin" element={<AdminUpload />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </motion.div>
    </Router>
  )
}

export default App