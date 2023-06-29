const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/user')


app.use(express.json())
app.use(cors())
app.use('/api', userRoutes)

const uri = "mongodb+srv://netflixdatabase:YPTdReRQcXTOM1W7@netflixdatabsecluster.8tru0xo.mongodb.net/?retryWrites=true&w=majority"

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