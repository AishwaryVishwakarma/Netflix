const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()

/*global process*/

const privateKey = process.env.PRIVATE_KEY


function generateJWT(id, remember_me){
    if (remember_me === true){ 
        return jwt.sign({ id: id }, privateKey, {expiresIn: '30d'})
    }
    return jwt.sign({ id: id}, privateKey, {expiresIn: '1d'})
}


function verifyJWT(jwtToken){
    return jwt.verify(jwtToken, privateKey).id.id
}


module.exports = { generateJWT, verifyJWT }