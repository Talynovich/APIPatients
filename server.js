import cors from 'cors'
import express from 'express'

import './config/env.js'
import { connectDB } from './db.js'
import authRouter from './routes/auth.routes.js'
import patientsRouter from './routes/patients.routes.js'
import usersRouter from './routes/users.routes.js'

await connectDB()

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/patients', patientsRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`)
})
