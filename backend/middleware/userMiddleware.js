const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()
const privateKey = process.env.PRIVATE_KEY


function generateJWT(id){
    return jwt.sign({ id: id }, privateKey)
}


function verifyJWT(jwtToken){
    return jwt.verify(jwtToken, privateKey).id.id
}


module.exports = { generateJWT, verifyJWT }