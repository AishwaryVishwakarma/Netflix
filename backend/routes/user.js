const express = require('express')
const router = express.Router()
const userModel = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const saltSize = 10


router.post('/login', async(req,res) =>{
    const userData = req.body
    const userCreds = {
        email: userData.email,
        password: userData.password
    }

    const user = await userModel
        .findOne({email: userCreds.email})
        .exec()
    
    if (user && await bcrypt.compare(userCreds.password, user.password)){
        await res.send(user).status(200)

    }
    else{
        res.status(401).send({"detail":"user dosen't exists or password is incorrect"})

    }

})


router.post('/signup', async(req,res) =>{
    const userData = req.body

    const userCreds = {
        email: userData.email,
        password: userData.password
    }
    
    const found = await userModel
        .findOne({email: userCreds.email})
        .exec()
    
    if (found != null){
        res.status(409).send({"detail":"User Already Exists"}) // status code for conflict 
    }
    else{
        try{
            const salt = await bcrypt.genSalt(saltSize)
            const hashedPwd = await bcrypt.hash(userCreds.password, salt)
            userCreds.password = hashedPwd
            const newUser = new userModel(userCreds)
            await newUser.save()
            res.status(201).send(newUser)
        }

        catch (err){
            res.send(err) // error cases to be discussed
        }
    }
})

module.exports = router