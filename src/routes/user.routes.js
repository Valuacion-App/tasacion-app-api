import { Router } from 'express'
import * as userController from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/authenticationJwT.js'

const router = Router()

router.put('/:userId', verifyToken, userController.updateUser)

router.delete('/:userId', verifyToken, userController.deleteUserById)
export default router
