import csv from 'csv-parser'
import { cleanFile } from '../libs/csv/cleanFile.js'
import { validateFile } from '../libs/csv/validateFile.js'
import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'
import SubGroup from '../models/mongo/subgroup.model.js'
import { dataMapperSubGroup } from '../libs/csv/dataMapper.js'
import AppraisalArticleModel from '../models/mongo/appraisalArticle.model.js'

export const getSubGroups = async (req, res) => {
  try {
    const allSubGroups = await SubGroup.find().sort({ name: 'asc' })
    res.status(200).json(allSubGroups)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const getSubGroup = async (req, res) => {
  try {
    const idSubGroup = req.params.id
    const subGroup = await SubGroup.findById(idSubGroup)

    if (!subGroup) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Sub-grupo no encontrado'
      })
    }

    res.status(200).json(subGroup)
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const createSubGroup = async (req, res) => {
  try {
    const input = req.body
    const newSubGroup = await SubGroup(input)
    const subGroupSaved = await newSubGroup.save()

    res.status(201).json({
      message: 'Sub-grupo creado correctamente',
      data: {
        id: subGroupSaved._id,
        name: newSubGroup.name
      }
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const updateSubGroup = async (req, res) => {
  try {
    const idSubGroup = req.params.id
    const newValues = req.body
    const updateSubGroup = await SubGroup.findByIdAndUpdate(
      idSubGroup,
      newValues,
      { new: true }
    )

    if (!updateSubGroup) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Sub-grupo no encontrado'
      })
    }

    res.status(200).json({
      message: 'Sub-grupo actualizado correctamente',
      data: updateSubGroup
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteSubGroup = async (req, res) => {
  try {
    const idSubGroup = req.params.id
    const subGroup = await SubGroup.findById(idSubGroup)

    if (!subGroup) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Sub-grupo no encontrado'
      })
    }

    const result = await AppraisalArticleModel.updateMany(
      { subGroup: subGroup._id },
      { $set: { subGroup: null } }
    )
    await subGroup.deleteOne()

    res.status(200).json({
      message: 'Sub-grupo eliminado correctamente',
      modifiedCount: result.modifiedCount
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}

export const deleteAllSubGroups = async (req, res) => {
  try {
    const result = await SubGroup.deleteMany({})
    res.status(200).json({
      message: 'Todos los sub-grupos se eliminaron correctamente',
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
          const newSubGroup = dataMapperSubGroup(row)
          if (newSubGroup) {
            parsedData.push(newSubGroup)
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

    await SubGroup.insertMany(parsedData)
    res.status(200).json({
      success: dataSuccess > 0,
      dataSuccess,
      dataRejected
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
