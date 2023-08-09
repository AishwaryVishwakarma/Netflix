const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const RedisStore = require("connect-redis").default
const session = require('express-session')
const redis = require('ioredis')

const userRoutes = require('./routes/user')
const userProfileRoutes = require('./routes/userProfile')

dotenv.config()

app.use(express.json())
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

redisClient.on('error', err => console.log(err))

const redisStore = new RedisStore({ client: redisClient })

app.use(
    session({
        store: redisStore,
        name: "user",
        secret: process.env.REDIS_SECRET, 
        resave: false, 
        saveUninitialized: false, 
        cookie:{
            secure: false, 
            httpOnly: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/'
        } 
    })
)

app.use('/', userRoutes)
app.use('/', userProfileRoutes)

const uri  = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`
mongoose.connect(
    uri,
    { useNewUrlParser: true }
)

const con = mongoose.connection

con.on('open', () =>{
    console.log("database connected")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`backend running on ${PORT} :)`)
})