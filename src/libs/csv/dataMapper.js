export const dataMapperUbication = (data) => {
  const codeUbication = data.Codigo
  const nameUbication = data.Ubicacion

  if (!codeUbication || !nameUbication) return false

  const newUbication = {
    code: codeUbication,
    name: nameUbication,
    detail: data.Detalle
  }
  return newUbication
}

export const dataMapperArticle = (data) => {
  const codeArticle = data.Codigo
  const nameArticle = data.NombreDelArticulo

  if (!codeArticle || !nameArticle) return false

  const newArticle = {
    code: codeArticle,
    name: nameArticle,
    detail: data.Detalle
  }
  return newArticle
}
