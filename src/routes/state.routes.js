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
import { verifyToken } from '../middlewares/authenticationJwT.js'

const router = Router()

router.get('/', verifyToken, getStates)
router.post('/', verifyToken, validateSchema(registerState), createState)
router.get('/:id', verifyToken, getState)
router.put('/:id', verifyToken, validateSchema(registerState.partial()), updateState)
router.delete('/:id', verifyToken, deleteState)

export default router
