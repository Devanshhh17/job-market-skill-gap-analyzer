const express = require('express')
const multer = require('multer')
const { uploadCSV } = require('../controllers/uploadController')

const router = express.Router()

// Configure multer for file upload
const upload = multer({
  dest: 'uploads/',
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