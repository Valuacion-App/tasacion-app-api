import { Router } from 'express'
import {
  getStates,
  createState,
  getState,
  updateState,
  deleteState
} from '../controllers/state.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerState } from '../schemas/state.schema.js'

const router = Router()

router.get('/', getStates)
router.post('/', validateSchema(registerState), createState)
router.get('/:id', getState)
router.put('/:id', updateState)
router.delete('/:id', deleteState)

export default router
