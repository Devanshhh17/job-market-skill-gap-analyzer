const fs = require('fs')
const csv = require('csv-parser')
const Job = require('../models/Job')
const { cleanJobData } = require('../utils/cleaningHelpers')

// Upload and process CSV file
const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const results = []
    const filePath = req.file.path

    // Parse CSV
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Clean and validate data
          const cleanedJobs = results.map(cleanJobData).filter(job => job !== null)

          // Insert into database
          if (cleanedJobs.length > 0) {
            await Job.insertMany(cleanedJobs)
          }

          // Clean up uploaded file
          fs.unlinkSync(filePath)

          res.json({
            message: `Successfully uploaded ${cleanedJobs.length} jobs`,
            uploaded: cleanedJobs.length,
            skipped: results.length - cleanedJobs.length
          })
        } catch (error) {
          // Clean up uploaded file
          fs.unlinkSync(filePath)
          res.status(500).json({ message: 'Error processing CSV data: ' + error.message })
        }
      })
      .on('error', (error) => {
        // Clean up uploaded file
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
        res.status(500).json({ message: 'Error reading CSV file: ' + error.message })
      })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  uploadCSV
}