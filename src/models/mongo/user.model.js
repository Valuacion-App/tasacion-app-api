import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: {},
  fullname: {},
  email: {},
  password: {}
}, {
  timestamps: true
})

export default mongoose.model('User', userSchema)
