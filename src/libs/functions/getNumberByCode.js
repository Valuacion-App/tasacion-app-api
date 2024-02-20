export const getNumberByCode = (codeString) => {
  const numbers = codeString.match(/\d+/)
  return numbers ? parseInt(numbers[0]) : null
}
