import { Router } from 'express'
import {
  createAppraisalArticle,
  getAppraisalArticle,
  updateAppraisalArticle,
  deleteAppraisalArticle,
  getFilterAppraisalArticles,
  uploadDataCsv,
  uploadDataCsvSubGroup,
  deleteAllDataFromUbication,
  filterOrderUbicationSubGroup
} from '../controllers/appraisalArticle.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerAppraisalArticle } from '../schemas/appraisalArticle.schema.js'
import { upload } from '../middlewares/multer.js'

const router = Router()

router.get('/search', getFilterAppraisalArticles)
router.get('/filter', filterOrderUbicationSubGroup)
router.get('/:id', getAppraisalArticle)

router.post(
  '/',
  validateSchema(registerAppraisalArticle),
  createAppraisalArticle
)
router.post(
  '/import-data/ubication/:id',
  upload.single('csvFile'),
  uploadDataCsv
)
router.post(
  '/import-data/subgroup/:id',
  upload.single('csvFile'),
  uploadDataCsvSubGroup
)
router.put(
  '/:id',
  validateSchema(registerAppraisalArticle.partial()),
  updateAppraisalArticle
)
router.delete('/delete-all/:id', deleteAllDataFromUbication)
router.delete('/:id', deleteAppraisalArticle)

export default router
