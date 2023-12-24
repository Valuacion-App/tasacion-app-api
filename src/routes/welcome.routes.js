import { Router } from 'express'
import { welcome } from '../controllers/index.js'

const router = Router()

router.get('/', welcome)

export default router
