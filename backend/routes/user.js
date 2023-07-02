const express = require('express')
const router = express.Router()
const userModel = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const saltSize = process.env.SALT_SIZE


router.post('/login', async(req,res) =>{
    const userData = req.body
    const userCreds = {
        email: userData.email,
        password: userData.password
    }

    if (!userCreds.email || userCreds.email===""){
        res.status(400).send({"detail": "Mandatory Field email missing"})
        return 
    }

    if (!userCreds.password || userCreds.password===""){
        res.status(400).send({"detail": "Mandatory Field password missing"})
        return 
    }

    const user = await userModel
        .findOne({email: userCreds.email})
        .exec()
    
    if (user && await bcrypt.compare(userCreds.password, user.password)){
        res.send(user).status(200)

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

    if (!userCreds.email || userCreds.email===""){
        res.status(400).send({"detail": "Mandatory Field email missing"})
        return 
    }

    if (!userCreds.password || userCreds.password===""){
        res.status(400).send({"detail": "Mandatory Field password missing"})
        return 
    }
    
    const found = await userModel
        .findOne({email: userCreds.email})
        .exec()
    
    if (found != null){
        res.status(409).send({"detail":"User Already Exists"}) // status code for conflict 
        return 
    }
    else{
        try{
            const salt = await bcrypt.genSalt(saltSize)
            const hashedPwd = await bcrypt.hash(userCreds.password, salt)
            userCreds.password = hashedPwd
            const newUser = new userModel(userCreds)
            await newUser.save()
            res.status(201).send(newUser.id)
        }

        catch (err){
            res.send(err) // error cases to be discussed
        }
    }
})

router.post('/checkuser', async(req, res) =>{
    userData = req.body
    userCreds = {
        email : userData.email
    }

    const found = await userModel
        .findOne({email: userCreds.email})
        .exec()
    
    if (found != null){
        res.status(200).send({"detail":"User Already Exists"}) // status code for conflict 
        return 
    }
    else{
        res.status(404).send({"detail":"User not found"})
        return 
    }

})

router.post('/set-subscription', async(req, res) =>{
    userData = req.body
    userDetails = {
        id: userData._id,
        subscription: userData.subscription
    }

    const user = await userModel
        .findOne({ _id: userDetails.id })
        .exec()
    
    if (user != null){
        user.subscription.type = userDetails.subscription.type
        user.subscription.value = userDetails.subscription.value
        await user.save()
        res.status(200).send({"detail":"Subscription details added successfully"})
        return 
    }
    else{
        res.status(404).send({"detail":"User Not Found"})
        return 
    }


    
})

module.exports = router