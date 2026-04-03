import React, { useState } from 'react'
import { motion } from 'framer-motion'
import UploadForm from '../components/admin/UploadForm'
import ManualJobForm from '../components/admin/ManualJobForm'
import SeedPanel from '../components/admin/SeedPanel'
import SectionTitle from '../components/common/SectionTitle'

const AdminUpload = () => {
  const [messages, setMessages] = useState([])

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() }])
  }

  const handleUpload = (result) => addMessage(result)

  const handleManualSubmit = (jobData) => addMessage({ success: true, message: `Job "${jobData.title}" added successfully!` })

  const handleSeed = (result) => addMessage(result)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <SectionTitle title="Admin Console" subtitle="Intuitive data ops and job management" />

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="glass-card p-5">
          <h3 className="text-sm uppercase text-cyan-200 tracking-wider">Upload</h3>
          <p className="text-silver text-sm mb-4">Bulk import job dataset files with intelligent validation.</p>
          <UploadForm onUpload={handleUpload} />
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm uppercase text-cyan-200 tracking-wider">Manual Entry</h3>
          <p className="text-silver text-sm mb-4">Add and enrich listings quickly through the refined form.</p>
          <ManualJobForm onSubmit={handleManualSubmit} />
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm uppercase text-cyan-200 tracking-wider">Seed Data</h3>
          <p className="text-silver text-sm mb-4">Generate a baseline dataset for experimentation.</p>
          <SeedPanel onSeed={handleSeed} />
        </div>
      </div>

      {messages.length > 0 && (
        <div className="space-y-3">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg text-sm ${msg.success ? 'bg-emerald-900/20 border border-emerald-400/30 text-emerald-100' : 'bg-rose-900/20 border border-rose-400/30 text-rose-100'}`}
            >
              {msg.message}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default AdminUpload