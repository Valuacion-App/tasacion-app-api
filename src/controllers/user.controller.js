import User from '../models/mongo/user.model.js'
import { handleHttpError, handleHttpErrorCustome } from '../libs/handleHttpMessage/handleHttpError.js'
import { encryptPassword } from '../libs/authenticationJwt/encrypt.js'

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params
    const newValues = req.body
    newValues.password = await encryptPassword(newValues.password)
    const userUpdated = await User.findByIdAndUpdate(
      userId,
      newValues,
      {
        new: true
      })
    if (!userUpdated) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'El usuario no existe'
      })
    }
    res.status(200).json({
      message: 'usuario actualizado correctamente',
      data: userUpdated
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteUserById = async (req, res) => {
  const { userId } = req.params
  const userFound = await User.findByIdAndDelete(userId)
  if (!userFound) {
    return handleHttpErrorCustome({
      res,
      code: 404,
      message: 'Usuario no encontrado'
    })
  }
  res.status(200).json({
    message: 'Usuario eliminado correctamente'
  })
}
