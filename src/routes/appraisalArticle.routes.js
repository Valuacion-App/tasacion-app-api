import { Router } from 'express'
import {
  getAppraisalArticles,
  createAppraisalArticle,
  getAppraisalArticle,
  updateAppraisalArticle,
  deleteAppraisalArticle,
  getFilterAppraisalArticles
} from '../controllers/appraisalArticle.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerAppraisalArticle } from '../schemas/appraisalArticle.schema.js'

const router = Router()

router.get('/', getAppraisalArticles)
router.get('/search', getFilterAppraisalArticles)
router.post(
  '/',
  validateSchema(registerAppraisalArticle),
  createAppraisalArticle
)
router.get('/:id', getAppraisalArticle)
router.put('/:id', validateSchema(registerAppraisalArticle.partial()), updateAppraisalArticle)
router.delete('/:id', deleteAppraisalArticle)

export default router
