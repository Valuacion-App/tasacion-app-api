import { Router } from 'express'
import {
  getSubGroups,
  getSubGroup,
  createSubGroup,
  updateSubGroup,
  deleteSubGroup,
  deleteAllSubGroups,
  uploadDataCsv
} from '../controllers/subgroup.controller.js'
import { registerSubGroup } from '../schemas/subgroup.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { upload } from '../middlewares/multer.js'
import { verifyToken } from '../middlewares/authenticationJwT.js'
const router = Router()

router.get('/', verifyToken, getSubGroups)
router.post('/', verifyToken, validateSchema(registerSubGroup), createSubGroup)
router.post('/import-data', upload.single('csvFile'), uploadDataCsv)
router.get('/:id', getSubGroup)
router.put('/:id', verifyToken, validateSchema(registerSubGroup.partial()), updateSubGroup)
router.delete('/delete-all', deleteAllSubGroups)
router.delete('/:id', verifyToken, deleteSubGroup)

export default router
