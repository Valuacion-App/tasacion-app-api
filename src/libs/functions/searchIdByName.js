export const searchIdByName = (name, list) => {
  const itemFound = list.find((item) => item.name === name.trim())
  return itemFound ? itemFound._id : null
}

export const searchIdByContainName = (name, list) => {
  const nameLower = name.toLowerCase()
  const itemFound = list.find((item) => nameLower.includes(item.name.toLowerCase()))
  return itemFound ? itemFound._id : null
}
