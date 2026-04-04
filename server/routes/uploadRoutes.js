const express = require('express')
const multer = require('multer')
const { uploadCSV } = require('../controllers/uploadController')

const router = express.Router()

// Use /tmp for serverless environments (Vercel) to avoid Read-Only File System errors
const uploadDir = process.env.VERCEL || process.env.NODE_ENV === 'production' ? '/tmp' : 'uploads/'

const upload = multer({
  dest: uploadDir,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true)
    } else {
      cb(new Error('Only CSV files are allowed'))
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
})

// POST /api/upload/csv
router.post('/csv', upload.single('file'), uploadCSV)

module.exports = router