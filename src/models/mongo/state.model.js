import mongoose from 'mongoose'
const { Schema } = mongoose

const stateSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  k2: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('State', stateSchema)
