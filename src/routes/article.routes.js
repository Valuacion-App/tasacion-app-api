import { Router } from 'express'
import {
  getArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  deleteAllArticles,
  uploadDataCsv
} from '../controllers/article.controller.js'
import { registerArticle } from '../schemas/article.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { upload } from '../middlewares/multer.js'
const router = Router()

router.get('/', getArticles)
router.post('/', validateSchema(registerArticle), createArticle)
router.post('/import-data', upload.single('csvFile'), uploadDataCsv)
router.get('/:id', getArticle)
router.put('/:id', validateSchema(registerArticle.partial()), updateArticle)
router.delete('/delete-all', deleteAllArticles)
router.delete('/:id', deleteArticle)

export default router
