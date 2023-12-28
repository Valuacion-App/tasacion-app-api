import { Router } from 'express'
import {
  createUbication,
  getUbications,
  getUbication,
  updateUbication,
  deleteUbication
} from '../controllers/ubication.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerUbication } from '../schemas/ubication.schema.js'

const router = Router()

router.get('/', getUbications)
router.post('/', validateSchema(registerUbication), createUbication)
router.get('/:id', getUbication)
router.put('/:id', validateSchema(registerUbication.partial()), updateUbication)
router.delete('/:id', deleteUbication)

export default router
