//to load .env content into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Router/routes')
require('./DB/connection')
//creating server
const pfServer = express()

//configuring cors in server
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)

const PORT = 3000

//to run server
pfServer.listen(PORT, () => {
    console.log(`server is running at:${PORT}`)
})

pfServer.get('/', (req, res) => {
    res.status(200).send("<h1>The request is hit at server..</h1>")
})