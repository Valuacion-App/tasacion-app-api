import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerUserSchema, loginSchema } from '../schemas/auth.schema.js'
const router = Router()

router.post('/signup', validateSchema(registerUserSchema), authController.signUp)

router.post('/signin', validateSchema(loginSchema), authController.signIn)

router.post('/logout', authController.logOut)

router.get('/AllUsers', authController.getAllUsers)
export default router
