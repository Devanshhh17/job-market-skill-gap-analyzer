import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUpload, FaFileCsv } from 'react-icons/fa'
import GlassCard from '../common/GlassCard'
import GlowButton from '../common/GlowButton'

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
    } else {
      alert('Please select a valid CSV file.')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    // Mock upload - in real app, send to API
    setTimeout(() => {
      onUpload({ success: true, message: 'CSV uploaded successfully!' })
      setUploading(false)
      setFile(null)
    }, 2000)
  }

  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-4 text-cyan-400">Upload CSV Data</h3>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          <FaFileCsv className="mx-auto text-4xl text-gray-400 mb-4" />
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload"
          />
          <label 
            htmlFor="csv-upload"
            className="cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {file ? file.name : 'Click to select CSV file'}
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Supported format: CSV with job data
          </p>
        </div>

        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-green-900/20 border border-green-800/50 rounded-lg p-3"
          >
            <div className="flex items-center">
              <FaFileCsv className="text-green-400 mr-2" />
              <span className="text-green-300">{file.name}</span>
            </div>
            <GlowButton 
              onClick={handleUpload}
              disabled={uploading}
              className="text-sm py-2 px-4"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </GlowButton>
          </motion.div>
        )}
      </div>
    </GlassCard>
  )
}

export default UploadForm