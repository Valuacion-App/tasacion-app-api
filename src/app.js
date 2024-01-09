import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './config/mongo.js'
import routeWelcome from './routes/welcome.routes.js'
import routeState from './routes/state.routes.js'
import routeUbications from './routes/ubication.routes.js'
import cookieParser from 'cookie-parser'
import routeSubgroups from './routes/subgroup.routes.js'
import routeArticles from '../src/routes/article.routes.js'
import userRoutes from './routes/user.routes.js'
import routeAppraisalArticle from '../src/routes/appraisalArticle.routes.js'

import authRoutes from './routes/authentication.routes.js'
dotenv.config()

const app = express()

const apiRoute = '/api/v1'

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.disable('x-powered-by')

app.use(apiRoute, routeWelcome)
app.use(apiRoute + '/states', routeState)
app.use(apiRoute + '/ubications', routeUbications)
app.use(apiRoute + '/auth', authRoutes)
app.use(apiRoute + '/sub-groups', routeSubgroups)
app.use(apiRoute + '/articles', routeArticles)
app.use(apiRoute + '/users', userRoutes)
app.use(apiRoute + '/appraisalArticles', routeAppraisalArticle)

connectDB()

export default app
