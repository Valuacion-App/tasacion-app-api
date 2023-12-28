import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  fullname: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [{
      type: String,
      enum: ['admin', 'user']
    }],
    default: ['user']
  }
}, {
  timestamps: true,
  versionKey: false
})

export default model('User', userSchema)
