import csv from 'csv-parser'
import { cleanFile } from '../libs/csv/cleanFile.js'
import { validateFile } from '../libs/csv/validateFile.js'
import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'
import Article from '../models/mongo/article.model.js'
import { dataMapperArticle } from '../libs/csv/dataMapper.js'

export const getArticles = async (req, res) => {
  try {
    const allArticles = await Article.find().sort({ name: 'asc' })
    res.status(200).json(allArticles)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const getArticle = async (req, res) => {
  try {
    const idArticle = req.params.id
    const article = await Article.findById(idArticle)

    if (!article) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Artículo no encontrado'
      })
    }

    res.status(200).json(article)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const createArticle = async (req, res) => {
  try {
    const input = req.body
    const newArticle = new Article(input)
    const articleSaved = await newArticle.save()

    res.status(201).json({
      message: 'Artículo creado correctamente',
      data: {
        id: articleSaved._id,
        code: articleSaved.code,
        name: articleSaved.name
      }
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const updateArticle = async (req, res) => {
  try {
    const idArticle = req.params.id
    const newValues = req.body
    const updatedArticle = await Article.findByIdAndUpdate(
      idArticle,
      newValues,
      { new: true }
    )

    if (!updatedArticle) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Artículo no encontrado'
      })
    }
    res.status(200).send({
      message: 'Artículo actualizado correctamente',
      data: updatedArticle
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteArticle = async (req, res) => {
  try {
    const idArticle = req.params.id
    const article = await Article.findByIdAndDelete(idArticle)

    if (!article) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Artículo no encontrado'
      })
    }
    res.status(200).json({
      message: 'Artículo eliminado correctamente'
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteAllArticles = async (req, res) => {
  try {
    const result = await Article.deleteMany({})
    res.status(200).json({
      message: 'Todos los tipos de artículos se eliminaron correctamente',
      count: result.deletedCount
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const uploadDataCsv = async (req, res) => {
  try {
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

    await new Promise((resolve, reject) => {
      const stream = csv({ separator: ',' })
        .on('data', (row) => {
          const newArticle = dataMapperArticle(row)
          if (newArticle) {
            parsedData.push(newArticle)
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

    await Article.insertMany(parsedData)
    res.status(200).json({
      success: dataSuccess > 0,
      dataSuccess,
      dataRejected
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
