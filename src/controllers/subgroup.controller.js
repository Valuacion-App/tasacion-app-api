import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'
import SubGroup from '../models/mongo/subgroup.model.js'

export const getSubGroups = async (req, res) => {
  try {
    const allSubGroups = await SubGroup.find()
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
    const subGroup = await SubGroup.findByIdAndDelete(idSubGroup)

    if (!subGroup) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Sub-grupo no encontrado'
      })
    }

    res.status(200).json({
      message: 'Sub-grupo eliminado correctamente'
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
