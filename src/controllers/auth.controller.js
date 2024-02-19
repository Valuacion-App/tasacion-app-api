import User from '../models/mongo/user.model.js'
import { handleHttpError } from '../libs/handleHttpMessage/handleHttpError.js'
import { encryptPassword, comparePassword } from '../libs/authenticationJwt/encrypt.js'
import { createAccessToken } from '../libs/authenticationJwt/jwt.js'

export const signUp = async (req, res) => {
  try {
    const input = req.body
    input.password = await encryptPassword(input.password)
    const newUser = new User(input)
    const saveUser = await newUser.save()
    const token = await createAccessToken({ id: saveUser._id, roles: saveUser.roles })
    res.status(201).json(token)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({ message: 'Credenciales incorrectas' })

    const matchPassword = await comparePassword(password, userFound.password)

    if (!matchPassword) return res.status(400).json({ message: 'Credenciales incorrectas' })

    const token = await createAccessToken({ id: userFound._id, roles: userFound.roles })

    res.status(201).json(token)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const logOut = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const getAllUsers = async (req, res) => {
  const Users = await User.find()
  res.status(200).json(Users)
}
