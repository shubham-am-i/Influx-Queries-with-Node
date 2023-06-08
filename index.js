// external imports
import express from 'express'
import colors from 'colors'
// local imports
import connectToDatabase from './config/db.js'
import {
  addTemperature,
  deleteTemperature,
  getTemperature,
  getAllMeasurements,
} from './controllers/temperatureController.js'

// intialize app
const app = express()

// middleware
app.use(express.json())

// api endpoints
app.get('/temperature/:location', getTemperature)
app.post('/temperature', addTemperature)
app.delete('/temperature/:location', deleteTemperature)
app.get('/measurements', getAllMeasurements)

const port = 3000
const bootstrap = async () => {
  await connectToDatabase()
  app.listen(port, () => console.log(`Server is running on port ${port}`.yellow.bold))
}

bootstrap()
