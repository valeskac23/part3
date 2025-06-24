const express = require ('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const personRouter = require('./controllers/person')
const middleware = require ('./utils/middleware')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then(()=>{
  logger.info('conntected to MongoDB')
}).catch((error)=>{
  logger.error('error connection to MongoDB', error.message)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/person', personRouter)
app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)

module.exports = app