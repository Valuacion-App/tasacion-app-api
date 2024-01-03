import { Router } from 'express'
import { getArticles, createArticle, getArticle, updateArticle, deleteArticle } from '../controllers/article.controller.js'
import { registerArticle } from '../schemas/article.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
const router = Router()

router.get('/', getArticles)
router.post('/', validateSchema(registerArticle), createArticle)
router.get('/:id', getArticle)
router.put('/:id', validateSchema(registerArticle.partial()), updateArticle)
router.delete('/:id', deleteArticle)

export default router
