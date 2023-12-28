import User from '../models/mongo/user.model.js'
import { handleHttpError } from '../libs/handleHttpMessage/handleHttpError.js'
import { encryptPassword, comparePassword } from '../libs/authenticationJwt/encrypt.js'
import { createAccessToken } from '../libs/authenticationJwt/jwt.js'
// export const signUp = async (req, res) => {
//   const { username, email, password, roles } = req.body

//   const newUser = new User({
//     username,
//     email,
//     password: await encryptPassword(password)
//   })
//   if (roles) {
//     const foundRoles = await Role.find({ name: { $in: roles } })
//     newUser.roles = foundRoles.map(role => role._id)
//   } else {
//     const role = await Role.findOne({ name: 'user' })
//     newUser.roles = [role._id]
//   }
//   const saveUser = await newUser.save()

//   const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
//     expiresIn: 86400
//   })
//   res.status(200).json({ token })
// }
export const signUp = async (req, res) => {
  try {
    const input = req.body
    input.password = await encryptPassword(input.password)
    const newUser = new User(input)
    const saveUser = await newUser.save()
    const token = await createAccessToken({ id: saveUser._id })

    res.cookie('token', token)
    res.status(201).json({
      id: saveUser._id,
      username: saveUser.username,
      email: saveUser.email
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({ message: 'usuario no encontrado' })

    const matchPassword = await comparePassword(password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: 'contraseña invalida' })

    const token = await createAccessToken({ id: userFound._id })

    res.cookie('token', token)
    res.status(201).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
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
export const deleteUserById = async (req, res) => {
  const { userId } = req.params
  await User.findByIdAndDelete(userId)
  res.status(204).json()
}

export const getAllUsers = async (req, res) => {
  const Users = await User.find()
  res.status(200).json(Users)
}
