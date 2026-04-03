const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

// Import routes
const jobRoutes = require('./routes/jobRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

// Import middleware
const errorMiddleware = require('./middleware/errorMiddleware')

// Connect to MongoDB
const connectDB = require('./config/db')

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/jobs', jobRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/upload', uploadRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Error handling middleware
app.use(errorMiddleware)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})