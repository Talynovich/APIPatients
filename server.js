import express from 'express'

import { connectDB } from './db.js'
import patientsRouter from './routes/patients.route.js'

await connectDB()

const app = express()
const port = 3000

app.use(express.json())

app.use('/patients', patientsRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
