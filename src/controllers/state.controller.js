import State from '../models/mongo/state.model.js'
import {
  handleHttpError,
  handleHttpErrorCustome
} from '../libs/handleHttpMessage/handleHttpError.js'

export const getStates = async (req, res) => {
  try {
    const allStates = await State.find()
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
        id: stateSaved.id,
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
        message: 'El estado no existe'
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
        message: 'El estado no existe'
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
    const state = await State.findByIdAndDelete(idState)

    if (!state) {
      return handleHttpErrorCustome({
        res,
        code: 404,
        message: 'El estado no existe'
      })
    }
    return res.status(200).json({ message: 'Estado eliminado correctamente' })
  } catch (error) {
    handleHttpError({ res, error: error.message })
  }
}
