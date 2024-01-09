import jwt from 'jsonwebtoken'
import { handleHttpErrorCustome } from '../libs/handleHttpMessage/handleHttpError.js'

export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'No se envio ningun token' })

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token no valido' })
      req.user = user
      next()
    })
  } catch (error) {
    return res.status(401).json({ message: 'Sin autorizacion' })
  }
}
export const isAdmin = async (req, res, next) => {
  try {
    const roles = req.user.roles
    if (!roles) return handleHttpErrorCustome({ res, code: 403, message: 'Este usuario no tiene roles' })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === 'admin') {
        next()
        return
      }
    }
    res.status(403).json({ message: 'Acceso denegado' })
  } catch (error) {
    return res.status(401).json({ message: 'Sin autorizacion' })
  }
}
