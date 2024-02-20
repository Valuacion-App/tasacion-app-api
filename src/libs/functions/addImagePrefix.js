const prefix = 'https://adalo-uploads.imgix.net/'

export const getImagePrefix = (imageData) => {
  const imageJSON = JSON.parse(imageData.replace(/'/g, '"'))
  if (imageJSON.url) {
    return prefix + imageJSON.url
  }
  return null
}
