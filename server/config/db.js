const mongoose = require('mongoose')

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('Fatal Error: MONGODB_URI is not defined in the environment variables.')
    return false
  }
  let retries = 5
  while (retries > 0) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI)
      console.log(`MongoDB Connected: ${conn.connection.host}`)
      return true
    } catch (error) {
      console.log(`Retrying DB connection... (${retries} attempts left)`)
      retries--
      if (retries === 0) {
        console.error('Database connection error:', error.message)
        console.warn('MongoDB is not available. Running in offline mode with sample data.')
        return false
      }
      await new Promise(res => setTimeout(res, 2000)) // Reduced to 2 seconds for faster fallback
    }
  }
}

module.exports = connectDB