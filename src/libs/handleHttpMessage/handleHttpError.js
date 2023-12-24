export const handleHttpError = ({ res, error }) => {
  const statusCode = 500
  const errorMessage = error || 'Internal Server Error'
  return res.status(statusCode).json({ error: errorMessage })
}

export const handleHttpErrorCustome = ({ res, message, code }) => {
  const statusCode = code || 500
  const errorMessage = message || 'Internal Server Error'
  return res.status(statusCode).json({ error: errorMessage })
}
