import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const DB_URI = process.env.DB_URI || ''
    await mongoose.connect(DB_URI)
    // console.log('>>> Database connected')
  } catch (error) {
    console.error(error)
    throw error
  }
}
