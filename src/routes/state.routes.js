import { Router } from 'express'
import {
  getStates,
  createState,
  getState,
  updateState,
  deleteState,
  deleteAllStates,
  uploadDataCsv
} from '../controllers/state.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerState } from '../schemas/state.schema.js'
import { verifyToken, isAdmin } from '../middlewares/authenticationJwT.js'
import { upload } from '../middlewares/multer.js'

const router = Router()

router.get('/', verifyToken, isAdmin, getStates)
router.post('/', verifyToken, validateSchema(registerState), createState)
router.post('/import-data', upload.single('csvFile'), uploadDataCsv)
router.get('/:id', verifyToken, getState)
router.put('/:id', verifyToken, validateSchema(registerState.partial()), updateState)
router.delete('/delete-all', deleteAllStates)
router.delete('/:id', verifyToken, deleteState)

export default router
