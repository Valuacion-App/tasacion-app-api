import User from '../models/mongo/user.model.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import Role from '../models/mongo/role.model.js'

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  })
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } })
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({ name: 'user' })
    newUser.roles = [role._id]
  }
  const saveUser = await newUser.save()

  const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
    expiresIn: 86400
  })
  res.status(200).json({ token })
}

export const signIn = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate('roles')
  if (!userFound) return res.status(400).json({ message: 'user not found' })

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if (!matchPassword) return res.status(401).json({ token: null, message: 'invalid password' })
  console.log(userFound)
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400
  })
  res.json({ token })
}

export const deleteUserById = async (req, res) => {
  const { userId } = req.params
  await User.findByIdAndDelete(userId)
  res.status(204).json()
}

export const getAllUsers = async (req, res) => {
  const Users = await User.find()
  res.status(204).json(Users)
}
