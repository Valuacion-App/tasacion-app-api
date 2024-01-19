export const validateFile = (req, fileType) => {
  if (!req.file) {
    return {
      status: 400,
      message: `No se proporcionó un archivo ${fileType}`
    }
  }

  const filename = req.file.originalname
  if (!filename.endsWith('csv')) {
    return {
      status: 400,
      message: `Se proporcionó un archivo con otra extensión y no un ${fileType}`
    }
  }

  return null
}
