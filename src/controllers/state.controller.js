import State from '../models/mongo/state.model.js'

export const getStates = async (req, res) => {
  const allStates = await State.find()
  res.json(allStates)
}

export const createState = async (req, res) => {
  const input = req.body

  try {
    const newState = new State({ ...input })

    const stateSaved = await newState.save()
    res.status(201).json({
      id: stateSaved.id,
      name: stateSaved.name,
      k2: stateSaved.k2
    })
  } catch (error) {
    console.error(error)
  }
}

export const getState = async (req, res) => {
  const state = await State.findById(req.params.id)
  if (!state) return res.status(404).json({ message: 'State Not found' })
  res.json(state)
}

export const updateState = async (req, res) => {
  const state = await State.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
  )
  if (!state) return res.status(404).json({ message: 'State Not found' })
  res.json(state)
}

export const deleteState = async (req, res) => {
  const state = await State.findByIdAndDelete(req.params.id)
  if (!state) return res.status(404).json({ message: 'State Not found' })
  return res.status(200).json({ message: 'State deleted' })
}
