import mongoose from 'mongoose'
import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'
import AppraisalArticle from '../models/mongo/appraisalArticle.model.js'

export const getAppraisalArticles = async (req, res) => {
  try {
    const allAppraisalArticles = await AppraisalArticle.find()
      .populate('state', 'name')
      .populate('ubication', 'name')
      .populate('article', 'name')
      .populate('subGroup', 'name')

    res.status(200).json(allAppraisalArticles)
  } catch (error) {
    handleHttpError({
      res,
      error: error.message
    })
  }
}

export const createAppraisalArticle = async (req, res) => {
  try {
    const input = req.body
    const newAppraisalArticle = new AppraisalArticle(input)
    const savedAppraisalArticle = await newAppraisalArticle.save()

    res.status(201).json({
      message: 'Articulo de tasacion creado correctamente',
      data: savedAppraisalArticle
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const getAppraisalArticle = async (req, res) => {
  try {
    const idAppraisalArticle = req.params.id
    const appraisalArticle = await AppraisalArticle.findById(idAppraisalArticle)
      .populate('state', 'name')
      .populate('ubication', 'name')
      .populate('article', 'name')
      .populate('subGroup', 'name')

    if (!appraisalArticle) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Articulo de tasacion no encontrado'
      })
    }

    res.status(200).json(appraisalArticle)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const updateAppraisalArticle = async (req, res) => {
  try {
    const idAppraisalArticle = req.params.id
    const newValues = req.body
    const updatedAppraisalArticle = await AppraisalArticle.findByIdAndUpdate(
      idAppraisalArticle,
      newValues,
      {
        new: true
      }
    )

    if (!updatedAppraisalArticle) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Articulo de tasacion no encontrado'
      })
    }
    res.status(200).json({
      message: 'Articulo de tasacion actualizado correctamente',
      updatedAppraisalArticle
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteAppraisalArticle = async (req, res) => {
  try {
    const idAppraisalArticle = req.params.id
    const appraisalArticle = await AppraisalArticle.findByIdAndDelete(
      idAppraisalArticle
    )

    if (!appraisalArticle) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Articulo de tasacion no encontrado'
      })
    }
    res.status(200).json({
      message: 'Articulo de tasacion eliminado correctamente'
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const getFilterAppraisalArticles = async (req, res) => {
  try {
    const { ubicationId, articleId, subgroupId, stateId } = req.query

    const filters = {}
    if (ubicationId) { filters.ubication = new mongoose.Types.ObjectId(ubicationId) }
    if (articleId) filters.article = new mongoose.Types.ObjectId(articleId)
    if (subgroupId) filters.subGroup = new mongoose.Types.ObjectId(subgroupId)
    if (stateId) filters.state = new mongoose.Types.ObjectId(stateId)

    const results = await AppraisalArticle.find(filters)
      .populate('state', 'name')
      .populate('ubication', 'name')
      .populate('article', 'name')
      .populate('subGroup', 'name')
    res.status(200).json(results)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
