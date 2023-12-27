export const validateSchema = (schema) => async (req, res, next) => {
  try {
    const result = await schema.parseAsync(req.body)
    req.body = result
    next()
  } catch (error) {
    return res
      .status(400)
      .json({ errors: error.errors.map((error) => error.message) })
  }
}
