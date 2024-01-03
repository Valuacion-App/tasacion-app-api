import Ubication from '../models/mongo/ubication.model.js'
import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'

export const getUbications = async (req, res) => {
  try {
    const allUbications = await Ubication.find()
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
    const ubication = await Ubication.findByIdAndDelete(idUbication)

    if (!ubication) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'Ubicación no encontado'
      })
    }
    res.status(200).json({
      message: 'Ubicación eliminado correctamente'
    })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
