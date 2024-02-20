import { getImagePrefix } from '../functions/addImagePrefix.js'
import { getNumberByCode } from '../functions/getNumberByCode.js'
import { searchIdByName, searchIdByContainName } from '../functions/searchIdByName.js'

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

export const dataMapperAppraisalArticle = ({ lists, data, idUbication }) => {
  const appraisalCode = data.CodigoTasacion
  const { articles, subgroups, states } = lists

  if (!appraisalCode) return false

  const newAppraisalArticle = {
    appraisalCode,
    code: data.Codigo,
    bullet: data.Viñeta,
    date: new Date(data.Fecha),
    ubication: idUbication,
    article: searchIdByName(data.Article, articles),
    subGroup: searchIdByName(data.SubGroup, subgroups),
    detail: data.Detalle,
    description: data.Descripcion,
    vre: Number(data.Vre),
    vr: Number(data.Vr),
    ant: Number(data.Ant),
    vexp: Number(data.Vexp),
    state: searchIdByContainName(data.EstadoDelArticulo, states),
    urlImage1: data.Fotografia ? getImagePrefix(data.Fotografia) : null,
    urlImage2: data.FotografiaII ? getImagePrefix(data.FotografiaII) : null,
    appraisalCodeNumber: getNumberByCode(appraisalCode),
    K1a: Number(data.K1a),
    Va: Number(data.Va),
    isPc: data.Article === 'TAS - EQUIPO DE COMPUTACIÓN'
  }
  return newAppraisalArticle
}
