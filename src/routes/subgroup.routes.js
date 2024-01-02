import { Router } from 'express'
import { getSubGroups, getSubGroup, createSubGroup, updateSubGroup, deleteSubGroup } from '../controllers/subgroup.controller.js'
import { registerSubGroup } from '../schemas/subgroup.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'

const router = Router()

router.get('/', getSubGroups)
router.post('/', validateSchema(registerSubGroup), createSubGroup)
router.get('/:id', getSubGroup)
router.put('/:id', validateSchema(registerSubGroup.partial()), updateSubGroup)
router.delete('/:id', deleteSubGroup)

export default router
