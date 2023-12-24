export const welcome = async (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API Tasacion Application V1'
  })
}
