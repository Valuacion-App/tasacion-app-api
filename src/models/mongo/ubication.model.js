import mongoose from 'mongoose'
const { Schema } = mongoose

const ubicationSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    detail: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Ubication', ubicationSchema)
