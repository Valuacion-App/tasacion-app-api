import csv from 'csv-parser'
import State from '../models/mongo/state.model.js'
import AppraisalArticleModel from '../models/mongo/appraisalArticle.model.js'
import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'
import { validateFile } from '../libs/csv/validateFile.js'
import { cleanFile } from '../libs/csv/cleanFile.js'
import { dataMapperState } from '../libs/csv/dataMapper.js'

export const getStates = async (req, res) => {
  try {
    const allStates = await State.find().sort({ k2: 'asc' })
    res.status(200).json(allStates)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const createState = async (req, res) => {
  try {
    const input = req.body
    const newState = new State(input)
    const stateSaved = await newState.save()

    res.status(201).json({
      message: 'Estado creado correctamente',
      data: {
        id: stateSaved._id,
        name: stateSaved.name,
        k2: stateSaved.k2
      }
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const getState = async (req, res) => {
  try {
    const id = req.params.id
    const state = await State.findById(id)

    if (!state) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Estado no encontrado'
      })
    }
    res.status(200).json(state)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const updateState = async (req, res) => {
  try {
    const idState = req.params.id
    const newValues = req.body
    const updatedState = await State.findByIdAndUpdate(idState, newValues, {
      new: true
    })

    if (!updatedState) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Estado no encontrado'
      })
    }
    res.status(200).json({
      message: 'Estado actualizado correctamente',
      data: updatedState
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteState = async (req, res) => {
  try {
    const idState = req.params.id
    const state = await State.findById(idState)

    if (!state) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Estado no encontrado'
      })
    }

    const result = await AppraisalArticleModel.updateMany(
      { state: state._id },
      { $set: { state: null } }
    )
    await state.deleteOne()

    return res.status(200).json({
      message: 'Estado eliminado correctamente',
      modifiedCount: result.modifiedCount
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteAllStates = async (req, res) => {
  try {
    const result = await State.deleteMany({})
    res.status(200).json({
      message: 'Todos los estados se eliminaron correctamente',
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
          const newState = dataMapperState(row)
          if (newState) {
            parsedData.push(newState)
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

    await State.insertMany(parsedData)
    res.status(200).json({
      success: dataSuccess > 0,
      dataSuccess,
      dataRejected
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
