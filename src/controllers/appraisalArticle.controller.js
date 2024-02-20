import mongoose from 'mongoose'
import csv from 'csv-parser'
import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'
import AppraisalArticle from '../models/mongo/appraisalArticle.model.js'
import Ubication from '../models/mongo/ubication.model.js'
import Article from '../models/mongo/article.model.js'
import State from '../models/mongo/state.model.js'
import SubGroup from '../models/mongo/subgroup.model.js'
import { dataMapperAppraisalArticle } from '../libs/csv/dataMapper.js'
import { validateFile } from '../libs/csv/validateFile.js'
import { cleanFile } from '../libs/csv/cleanFile.js'

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
    if (ubicationId) {
      filters.ubication = new mongoose.Types.ObjectId(ubicationId)
    }
    if (articleId) filters.article = new mongoose.Types.ObjectId(articleId)
    if (subgroupId) filters.subGroup = new mongoose.Types.ObjectId(subgroupId)
    if (stateId) filters.state = new mongoose.Types.ObjectId(stateId)

    const results = await AppraisalArticle.find(filters)
      .populate('state', 'name')
      .populate('ubication', 'name')
      .populate('article', 'name')
      .populate('subGroup', 'name')
      .sort({ appraisalCodeNumber: 'asc' })
    res.status(200).json(results)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const uploadDataCsv = async (req, res) => {
  try {
    const { id } = req.params
    const ubication = await Ubication.findById(id)

    if (!ubication) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'La ubicacion que proporciono no esta en la base de datos'
      })
    }

    const csvValidationResult = validateFile(req, 'csv')
    if (csvValidationResult) {
      return res
        .status(csvValidationResult.status)
        .json({ error: csvValidationResult.message })
    }

    const csvData = cleanFile(req.file.buffer.toString('utf-8'))
    const parsedData = []
    let dataSuccess = 0
    let dataRejected = 0

    const lists = {}
    lists.articles = await Article.find()
    lists.subgroups = await SubGroup.find()
    lists.states = await State.find()

    await new Promise((resolve, reject) => {
      const stream = csv({ separator: ',' })
        .on('data', (row) => {
          const newAppraisalArticle = dataMapperAppraisalArticle({
            lists,
            data: row,
            idUbication: ubication._id
          })

          if (newAppraisalArticle) {
            parsedData.push(newAppraisalArticle)
            dataSuccess += 1
          } else {
            dataRejected += 1
          }
        })
        .on('end', () => resolve())
        .on('error', (error) => reject(error))

      stream.write(csvData)
      stream.end()
    })
    await AppraisalArticle.insertMany(parsedData)
    res.status(200).json({
      success: dataSuccess > 0,
      dataSuccess,
      dataRejected
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteAllDataFromUbication = async (req, res) => {
  try {
    const idUbication = req.params.id
    const result = await AppraisalArticle.deleteMany({
      ubication: idUbication
    })
    res.status(200).json({
      message: 'Todas los items se eliminaron correctamente',
      count: result.deletedCount
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
