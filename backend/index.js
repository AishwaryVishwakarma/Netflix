const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
const userRoutes = require('./routes/user')
const userProfileRoutes = require('./routes/userProfile')
// const imageRoutes = require('./routes/image.js')
// const imageGoogleRoutes = require('./routes/image-google.js')
// const imageGoogleRoutes2 = require('./routes/image-google-2.js')
const imageFirebase = require('./routes/images-firebase')

dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/', userRoutes)
app.use('/', userProfileRoutes)
// app.use('/', imageRoutes)
// app.use('/', imageGoogleRoutes)
// app.use('/', imageGoogleRoutes2)
app.use('/', imageFirebase)


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