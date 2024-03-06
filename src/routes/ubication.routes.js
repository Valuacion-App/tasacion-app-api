import { Router } from 'express'
import {
  createUbication,
  getUbications,
  getUbication,
  updateUbication,
  deleteUbication,
  deleteAllUbications,
  uploadDataCsv
} from '../controllers/ubication.controller.js'
import { upload } from '../middlewares/multer.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerUbication } from '../schemas/ubication.schema.js'
import { verifyToken } from '../middlewares/authenticationJwT.js'

const router = Router()

router.get('/', verifyToken, getUbications)
router.post('/', validateSchema(registerUbication), createUbication)
router.post('/import-data', upload.single('csvFile'), uploadDataCsv)
router.get('/:id', getUbication)
router.put(
  '/:id',
  validateSchema(registerUbication.partial()),
  updateUbication
)
router.delete('/delete-all', deleteAllUbications)
router.delete('/:id', deleteUbication)

export default router
