import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './config/mongo.js'

import routeWelcome from './routes/welcome.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.use('/api', routeWelcome)

connectDB()
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}/api`)
})
