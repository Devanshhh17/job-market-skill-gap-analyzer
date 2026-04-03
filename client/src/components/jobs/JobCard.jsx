import React from 'react'
import { motion } from 'framer-motion'
import TiltCard from '../common/TiltCard'

const JobCard = ({ job, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(job)}
      className="cursor-pointer h-full"
    >
      <TiltCard className="h-full flex flex-col justify-between group glass-card-hover border-white/5">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1 transition-all">
                {job.title}
              </h3>
              <p className="text-zinc-300 font-medium tracking-wide">{job.company}</p>
            </div>
            <div className="neon-badge cyan bg-background/50 backdrop-blur-md">
              {new Date(job.postedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          </div>

          {/* Details Row */}
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="flex items-center text-sm text-zinc-400">
              <svg className="w-4 h-4 mr-1.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            <span className="flex items-center text-sm text-zinc-400">
              <svg className="w-4 h-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {job.workMode}
            </span>
            {job.salaryMin && job.salaryMax && (
              <span className="flex items-center text-sm text-green-400">
                <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ${(job.salaryMin/1000).toFixed(0)}k - ${(job.salaryMax/1000).toFixed(0)}k
              </span>
            )}
          </div>
        </div>

        {/* Skills Bottom */}
        <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {job.skills?.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-primary/10 text-primary-400 px-2.5 py-1 rounded-md border border-primary/20 
                           group-hover:border-primary/50 group-hover:bg-primary/20 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all"
              >
                {skill}
              </span>
            ))}
            {job.skills?.length > 3 && (
              <span className="text-xs text-zinc-500 px-1 py-1">
                +{job.skills.length - 3}
              </span>
            )}
          </div>
          <motion.div
            className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0"
          >
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default JobCard