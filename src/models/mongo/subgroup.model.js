import mongoose from 'mongoose'
const { Schema } = mongoose

const subGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('SubGroup', subGroupSchema)
