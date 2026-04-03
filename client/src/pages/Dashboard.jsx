import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FiltersPanel from '../components/dashboard/FiltersPanel'
import KPISection from '../components/dashboard/KPISection'
import SkillsChart from '../components/dashboard/SkillsChart'
import ToolsChart from '../components/dashboard/ToolsChart'
import SalaryRoleChart from '../components/dashboard/SalaryRoleChart'
import SalarySkillChart from '../components/dashboard/SalarySkillChart'
import WorkModeChart from '../components/dashboard/WorkModeChart'
import ExperienceChart from '../components/dashboard/ExperienceChart'
import RoleDistributionChart from '../components/dashboard/RoleDistributionChart'
import LocationChart from '../components/dashboard/LocationChart'
import JobsPreviewTable from '../components/dashboard/JobsPreviewTable'
import Loader from '../components/common/Loader'
import SectionTitle from '../components/common/SectionTitle'
import { analyticsAPI, jobsAPI } from '../services/api'
import { staggerContainer, staggerItem } from '../utils/motionVariants'

const Dashboard = () => {
  const [filters, setFilters] = useState({})
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)
        
        // Fetch all analytics data in parallel
        const [overview, topSkills, topTools, salaryByRole, salaryBySkill, workModes, experienceLevels, roleDistribution, topLocations, jobs] = await Promise.all([
          analyticsAPI.getOverview(),
          analyticsAPI.getTopSkills(),
          analyticsAPI.getTopTools(),
          analyticsAPI.getSalaryByRole(),
          analyticsAPI.getSalaryBySkill(),
          analyticsAPI.getWorkModes(),
          analyticsAPI.getExperienceLevels(),
          analyticsAPI.getRoleDistribution(),
          analyticsAPI.getTopLocations(),
          jobsAPI.getAll({ limit: 10 })
        ])

        const combinedData = {
          totalJobs: overview.data?.totalJobs || 0,
          avgSalary: overview.data?.avgSalary || 0,
          topSkill: topSkills.data?.[0]?.name || 'N/A',
          remotePercentage: workModes.data?.find?.(w => w.name === 'Remote')?.count || 0,
          topSkills: topSkills.data || [],
          topTools: topTools.data || [],
          salaryByRole: salaryByRole.data || [],
          salaryBySkill: salaryBySkill.data || [],
          workModes: workModes.data || [],
          experienceLevels: experienceLevels.data || [],
          roleDistribution: roleDistribution.data || [],
          topLocations: topLocations.data || [],
          recentJobs: jobs.data?.jobs || []
        }

        setData(combinedData)
        setError(null)
      } catch (err) {
        console.error('Error fetching analytics:', err)
        setError(err.message)
        // Fallback to empty data if API fails
        setData({
          totalJobs: 0,
          avgSalary: 0,
          topSkill: 'N/A',
          remotePercentage: 0,
          topSkills: [],
          topTools: [],
          salaryByRole: [],
          salaryBySkill: [],
          workModes: [],
          experienceLevels: [],
          roleDistribution: [],
          topLocations: [],
          recentJobs: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  if (loading) return <Loader size="lg" text="Loading Market Intelligence..." />

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center pb-20"
      >
        <div className="glass-card p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Connection Error</h2>
          <p className="text-gray-300 mb-6">
            Unable to connect to the backend server. Make sure:
          </p>
          <ul className="text-gray-400 text-sm space-y-2 mb-6 text-left">
            <li>✓ Backend server is running on port 5000</li>
            <li>✓ MongoDB is connected and running</li>
            <li>✓ Network connectivity is stable</li>
          </ul>
          <p className="text-xs text-gray-500">Error: {error}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-20"
    >
      {/* Page Header */}
      <SectionTitle
        title="Market Intelligence"
        subtitle="Real-time insights across talent landscape, roles, and opportunities."
        align="left"
      />

      {/* Controls Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mb-12"
      >
        <motion.div variants={staggerItem}>
          <FiltersPanel onFilterChange={handleFilterChange} />
        </motion.div>
      </motion.div>

      {/* KPI Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mb-16"
      >
        <motion.div variants={staggerItem}>
          <h3 className="premium-heading-sm mb-6">Key Performance Indicators</h3>
        </motion.div>
        <motion.div variants={staggerItem}>
          <KPISection data={data} />
        </motion.div>
      </motion.div>

      {/* Charts Grid - Premium Layout */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-12"
      >
        {/* Row 1: Top Skills & Tools */}
        <motion.div variants={staggerItem}>
          <h3 className="premium-heading-sm mb-6">Skill Demand</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="frosted-panel p-6">
              <h4 className="text-white font-semibold mb-6 text-lg">Top In-Demand Skills</h4>
              <SkillsChart data={data.topSkills} />
            </div>
            <div className="frosted-panel p-6">
              <h4 className="text-white font-semibold mb-6 text-lg">Tools & Platforms</h4>
              <ToolsChart data={data.topTools} />
            </div>
          </div>
        </motion.div>

        {/* Row 2: Salary Analysis */}
        <motion.div variants={staggerItem}>
          <h3 className="premium-heading-sm mb-6">Compensation Analysis</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="frosted-panel p-6">
              <h4 className="text-white font-semibold mb-6 text-lg">Salary by Role</h4>
              <SalaryRoleChart data={data.salaryByRole} />
            </div>
            <div className="frosted-panel p-6">
              <h4 className="text-white font-semibold mb-6 text-lg">Salary by Skill</h4>
              <SalarySkillChart data={data.salaryBySkill} />
            </div>
          </div>
        </motion.div>

        {/* Row 3: Market Distribution */}
        <motion.div variants={staggerItem}>
          <h3 className="premium-heading-sm mb-6">Market Distribution</h3>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="frosted-panel p-6">
              <h4 className="text-white font-semibold mb-6 text-lg">Work Mode</h4>
              <WorkModeChart data={data.workModes} />
            </div>
            <div className="frosted-panel p-6">
              <h4 className="text-white font-semibold mb-6 text-lg">Experience Level</h4>
              <ExperienceChart data={data.experienceLevels} />
            </div>
            <div className="frosted-panel p-6">
              <h4 className="text-white font-semibold mb-6 text-lg">Role Distribution</h4>
              <RoleDistributionChart data={data.roleDistribution} />
            </div>
          </div>
        </motion.div>

        {/* Row 4: Geography */}
        <motion.div variants={staggerItem}>
          <div className="premium-card p-6">
            <h4 className="text-white font-semibold mb-6 text-lg">Top Locations</h4>
            <LocationChart data={data.topLocations} />
          </div>
        </motion.div>

        {/* Row 5: Recent Jobs */}
        <motion.div variants={staggerItem}>
          <h3 className="premium-heading-sm mb-6">Latest Opportunities</h3>
          <div className="premium-card p-6">
            <JobsPreviewTable jobs={data.recentJobs} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard