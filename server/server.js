require('dotenv').config()//this reads our .env file and loads its variables into process.env

const express = require('express') //importing express and cors here, express lets us create a webserver and define API endpoints
const cors = require('cors')//cors controls which websites can make requests to our server

const app = express() //this creates our Express application

app.use(cors({ origin: process.env.CLIENT_ORIGIN })) //allows requests from our provided URL
app.use(express.json()) //allows Express to understand JSON sent in request bodies, everything below express.json HAS to be below it
const coursesRouter = require('./routes/courses')
app.use('/api', coursesRouter)
const completionsRouter = require('./routes/completions')
app.use('/api', completionsRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})