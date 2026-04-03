import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RoleSelector from '../components/skill-gap/RoleSelector'
import SkillsSelector from '../components/skill-gap/SkillsSelector'
import GapSummary from '../components/skill-gap/GapSummary'
import MissingSkills from '../components/skill-gap/MissingSkills'
import MatchedSkills from '../components/skill-gap/MatchedSkills'
import Recommendations from '../components/skill-gap/Recommendations'
import ReadinessScoreCard from '../components/skill-gap/ReadinessScoreCard'
import GlowButton from '../components/common/GlowButton'
import Loader from '../components/common/Loader'
import SectionTitle from '../components/common/SectionTitle'
import { staggerContainer, staggerItem } from '../utils/motionVariants'

const SkillGapAnalyzer = () => {
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!selectedRole || selectedSkills.length === 0) {
      alert('Please select a role and at least one skill.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const mockAnalysis = {
        role: selectedRole,
        matchedSkills: selectedSkills.filter(skill => ['Python', 'SQL', 'Excel'].includes(skill)),
        missingSkills: [
          { name: 'Machine Learning', priority: 9 },
          { name: 'Statistics', priority: 8 },
          { name: 'Data Visualization', priority: 7 },
          { name: 'Tableau', priority: 6 }
        ].filter(skill => !selectedSkills.includes(skill.name)),
        recommendations: [
          { name: 'Machine Learning', priority: 9, salaryImpact: 15000 },
          { name: 'Statistics', priority: 8, salaryImpact: 12000 },
          { name: 'Data Visualization', priority: 7, salaryImpact: 10000 }
        ],
        readinessScore: Math.min(100, Math.floor((selectedSkills.length / 10) * 100)),
        demandScore: 8.3
      }

      setAnalysis(mockAnalysis)
      setLoading(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden pb-20"
    >
      <SectionTitle
        title="Skill Gap Analysis"
        accent="Your AI Career Intelligence"
        subtitle="Discover precisely what skills matter for your target role and get a personalized growth path."
      />

      {/* Input Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mb-12"
      >
        <motion.div variants={staggerItem} className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]">
            <label className="block text-sm font-semibold text-accent mb-4 uppercase tracking-wide">Target Role</label>
            <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]">
            <label className="block text-sm font-semibold text-primary mb-4 uppercase tracking-wide">Your Current Skills</label>
            <SkillsSelector selectedSkills={selectedSkills} onSkillsChange={setSelectedSkills} />
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="flex justify-center">
          <GlowButton 
            onClick={handleAnalyze} 
            disabled={loading}
            className="px-12 py-4 text-lg"
          >
            {loading ? 'Analyzing Your Profile...' : 'Run Analysis'}
          </GlowButton>
        </motion.div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-20"
          >
            <Loader size="lg" text="Analyzing skill gaps and opportunities..." />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {analysis && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Readiness Scores */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid lg:grid-cols-3 gap-6"
            >
              <motion.div variants={staggerItem}>
                <ReadinessScoreCard score={analysis.readinessScore} demandScore={analysis.demandScore} />
              </motion.div>
              <motion.div variants={staggerItem} className="h-full">
                <div className="frosted-panel p-6 h-full flex flex-col justify-center text-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <span className="text-xs font-semibold uppercase text-zinc-400 tracking-widest block mb-4">Skills Match</span>
                  <p className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">{analysis.matchedSkills.length}<span className="text-2xl text-zinc-500">/10</span></p>
                  <p className="text-zinc-400">Current skill alignment</p>
                </div>
              </motion.div>
              <motion.div variants={staggerItem} className="h-full">
                <div className="frosted-panel p-6 h-full flex flex-col justify-center text-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  <span className="text-xs font-semibold uppercase text-zinc-400 tracking-widest block mb-4">Market Demand</span>
                  <p className="text-5xl font-black bg-gradient-to-r from-purple-400 to-primary bg-clip-text text-transparent mb-2">{analysis.demandScore.toFixed(1)}<span className="text-2xl text-zinc-500">/10</span></p>
                  <p className="text-zinc-400">Role opportunity score</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Matched & Missing Skills */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid lg:grid-cols-2 gap-6"
            >
              <motion.div variants={staggerItem}>
                <MatchedSkills skills={analysis.matchedSkills} />
              </motion.div>
              <motion.div variants={staggerItem}>
                <MissingSkills skills={analysis.missingSkills} />
              </motion.div>
            </motion.div>

            {/* Gap Summary */}
            <motion.div
              variants={staggerItem}
              initial="initial"
              animate="animate"
            >
              <GapSummary analysis={analysis} />
            </motion.div>

            {/* Recommendations */}
            <motion.div
              variants={staggerItem}
              initial="initial"
              animate="animate"
            >
              <Recommendations skills={analysis.recommendations} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SkillGapAnalyzer