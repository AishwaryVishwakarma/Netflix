const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
const userRoutes = require('./routes/user')

dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/', userRoutes)

/*global process*/


const uri  = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`
mongoose.connect(
    uri,
    { useNewUrlParser: true }
)

const con = mongoose.connection

con.on('open', () =>{
    console.log("database connected")
})

app.listen(8000, () => {
    console.log(`backend running on 8000 :)`)
})