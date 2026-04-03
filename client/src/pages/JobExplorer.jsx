import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import JobSearchBar from '../components/jobs/JobSearchBar'
import JobFilters from '../components/jobs/JobFilters'
import JobCard from '../components/jobs/JobCard'
import JobDetailsModal from '../components/jobs/JobDetailsModal'
import Loader from '../components/common/Loader'
import SectionTitle from '../components/common/SectionTitle'
import { jobsAPI } from '../services/api'

const JobExplorer = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})
  const [selectedJob, setSelectedJob] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await jobsAPI.getAll()

        const jobsData = response.data?.jobs ?? []

        setJobs(jobsData)
        setFilteredJobs(jobsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError(err.message)
        setJobs([])
        setFilteredJobs([])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase()

    const filtered = jobs.filter(job => {
      const matchesSearch =
        !lowerSearch ||
        job.title?.toLowerCase().includes(lowerSearch) ||
        job.company?.toLowerCase().includes(lowerSearch) ||
        (job.skills || []).some(skill =>
          skill.toLowerCase().includes(lowerSearch)
        )

      const matchesLocation =
        !filters.location ||
        filters.location === 'All' ||
        job.location === filters.location

      const matchesWorkMode =
        !filters.workMode ||
        filters.workMode === 'All' ||
        job.workMode === filters.workMode

      const matchesExperience =
        !filters.experienceLevel ||
        filters.experienceLevel === 'All' ||
        job.experienceLevel === filters.experienceLevel

      return (
        matchesSearch &&
        matchesLocation &&
        matchesWorkMode &&
        matchesExperience
      )
    })

    setFilteredJobs(filtered)
  }, [jobs, searchTerm, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleJobClick = (job) => {
    setSelectedJob(job)
    setModalOpen(true)
  }

  if (loading) return <Loader text="Fetching job opportunities..." />

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="glass-card p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Failed to Load Jobs
          </h2>
          <p className="text-gray-300 mb-4">
            Unable to fetch job listings from the server.
          </p>
          <p className="text-xs text-gray-500">Error: {error}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      <SectionTitle
        title="Job Explorer"
        subtitle="Explore curated opportunities with high-fidelity role matching"
      />

      <div className="glass-card p-5 grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <JobSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <JobFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="frosted-panel p-4 border border-cyan-300/20">
        <p className="text-sm text-silver">
          Showing{' '}
          <span className="font-bold text-white">
            {filteredJobs.length}
          </span>{' '}
          of{' '}
          <span className="font-bold text-white">
            {jobs.length}
          </span>{' '}
          listings
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job._id || index}   // ✅ FIXED HERE
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 * index }}
          >
            <JobCard job={job} onClick={() => handleJobClick(job)} />
          </motion.div>
        ))}
      </div>

      <JobDetailsModal
        job={selectedJob}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </motion.div>
  )
}

export default JobExplorer