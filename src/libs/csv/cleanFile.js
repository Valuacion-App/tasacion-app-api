export const cleanFile = (file) => {
  let newFile = file.trim()

  if (newFile.startsWith('\n') || newFile.startsWith('\r\n')) {
    newFile = newFile.substring(newFile.indexOf('\n') + 1)
  }

  return newFile
}
