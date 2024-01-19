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

export const dataMapperSubGroup = (data) => {
  const nameSubGroup = data.Nombre

  if (!nameSubGroup) return false

  const newSubGroup = {
    name: nameSubGroup
  }
  return newSubGroup
}

export const dataMapperState = (data) => {
  const nameState = data.EstadoSimple
  const valueState = data.K2

  if (!nameState || !valueState) return false

  const newState = {
    name: nameState,
    k2: Number(valueState)
  }
  return newState
}
