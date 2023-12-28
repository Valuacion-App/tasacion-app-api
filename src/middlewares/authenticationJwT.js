import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'No se envio ningun token' })

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'token no valido' })
      req.user = user
      next()
    })
  } catch (error) {
    return res.status(401).json({ message: 'sin autorizacion' })
  }
}
