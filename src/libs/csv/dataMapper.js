export const dataMapperUbication = (data) => {
  const codeUbication = data.Codigo
  const nameUbication = data.Ubicacion

  if (!codeUbication || !nameUbication) return false

  const newUbication = {
    code: data.Codigo,
    name: data.Ubicacion,
    detail: data.Detalle
  }
  return newUbication
}
