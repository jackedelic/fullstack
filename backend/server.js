const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')

const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

// Uncomment the following function once MONGO_URI is supplied in .env
// connectDB()

dotenv.config()

const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json()) // allow request of content-type of json

// Write your routes here

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  })
}

app.use(errorHandler) // this middleware must appear last as it is an error handler. https://expressjs.com/en/guide/error-handling.html#the-default-error-handler

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  () => `process running in ${process.env.NODE_ENV} in port ${PORT}`
)
