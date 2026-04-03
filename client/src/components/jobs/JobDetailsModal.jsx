import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const JobDetailsModal = ({ job, isOpen, onClose }) => {
  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!job) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col frosted-panel shadow-2xl shadow-primary/10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Sticky Area */}
            <div className="p-6 border-b border-white/10 relative shrink-0 bg-background/50 backdrop-blur-md z-10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors bg-white/5 rounded-full p-2 hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="pr-12">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                  {job.title}
                </h2>
                <p className="text-xl text-zinc-300 font-medium tracking-wide">{job.company}</p>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-transparent to-background/50">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 mb-1 block">Location</span>
                  <p className="text-white font-medium">{job.location}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 mb-1 block">Work Mode</span>
                  <p className="text-white font-medium">{job.workMode}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 mb-1 block">Experience</span>
                  <p className="text-white font-medium">{job.experienceLevel}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 mb-1 block">Type</span>
                  <p className="text-white font-medium">{job.employmentType}</p>
                </div>
              </div>

              {job.salaryMin && job.salaryMax && (
                <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20">
                  <span className="text-sm font-medium text-green-400 mb-1 block">Est. Salary Range</span>
                  <p className="text-3xl font-bold text-white">
                    ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} <span className="text-lg text-zinc-400 font-normal">{job.currency}</span>
                  </p>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="neon-badge bg-primary/10 border-primary/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {job.tools && job.tools.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="neon-badge cyan bg-accent/10 border-accent/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Job Description</h3>
                <div className="text-zinc-300 leading-relaxed space-y-4">
                  {job.description.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button className="neon-button w-full sm:w-auto">
                  Apply Now
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
                <div className="text-sm text-zinc-500 text-center sm:text-right">
                  <p>Posted {new Date(job.postedDate).toLocaleDateString()}</p>
                  <p>Source Component: {job.source}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default JobDetailsModal