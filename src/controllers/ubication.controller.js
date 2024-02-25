import csv from 'csv-parser'
import Ubication from '../models/mongo/ubication.model.js'
import AppraisalArticle from '../models/mongo/appraisalArticle.model.js'
import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'
import { dataMapperUbication } from '../libs/csv/dataMapper.js'
import { cleanFile } from '../libs/csv/cleanFile.js'
import { validateFile } from '../libs/csv/validateFile.js'

export const getUbications = async (req, res) => {
  try {
    const allUbications = await Ubication.find().sort({ name: 'asc' })
    res.status(200).json(allUbications)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const createUbication = async (req, res) => {
  try {
    const input = req.body
    const newUbication = new Ubication(input)
    const ubicationSaved = await newUbication.save()

    res.status(201).json({
      message: 'Ubicación creado correctamente',
      data: {
        id: ubicationSaved._id,
        code: ubicationSaved.code,
        name: ubicationSaved.name,
        detail: ubicationSaved.detail
      }
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const getUbication = async (req, res) => {
  try {
    const idUbication = req.params.id
    const ubication = await Ubication.findById(idUbication)

    if (!ubication) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Ubicación no encontado'
      })
    }
    res.status(200).json(ubication)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const updateUbication = async (req, res) => {
  try {
    const idUbication = req.params.id
    const newValues = req.body
    const updatedUbication = await Ubication.findByIdAndUpdate(
      idUbication,
      newValues,
      {
        new: true
      }
    )

    if (!updatedUbication) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Ubicación no encontado'
      })
    }
    res.status(200).json({
      message: 'Ubicación actualizado correctamente',
      data: updatedUbication
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteUbication = async (req, res) => {
  try {
    const idUbication = req.params.id
    const ubication = await Ubication.findById(idUbication)

    if (!ubication) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Ubicación no encontado'
      })
    }

    const result = await AppraisalArticle.updateMany(
      { ubication: ubication._id },
      { $set: { ubication: null } }
    )
    await ubication.deleteOne()

    await res.status(200).json({
      message: 'Ubicación eliminado correctamente',
      modifiedCount: result.modifiedCount
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteAllUbications = async (req, res) => {
  try {
    const result = await Ubication.deleteMany({})
    res.status(200).json({
      message: 'Todas las ubicaciones se eliminaron correctamente',
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
          const newUbication = dataMapperUbication(row)
          if (newUbication) {
            parsedData.push(newUbication)
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

    await Ubication.insertMany(parsedData)
    res.status(200).json({
      success: dataSuccess > 0,
      dataSuccess,
      dataRejected
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
