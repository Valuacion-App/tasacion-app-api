import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './config/mongo.js'

import routeWelcome from './routes/welcome.routes.js'
import routeState from './routes/state.routes.js'
import routeUbications from './routes/ubication.routes.js'
import routeSubgroups from './routes/subgroup.routes.js'

dotenv.config()

const app = express()

const apiRoute = '/api/v1'

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.use(apiRoute, routeWelcome)
app.use(apiRoute + '/states', routeState)
app.use(apiRoute + '/ubications', routeUbications)
app.use(apiRoute + '/sub-groups', routeSubgroups)

connectDB()

export default app
