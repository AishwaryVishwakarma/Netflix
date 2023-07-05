const express = require('express')
const router = express.Router()
const userModel = require('../schema/userSchema')
const userMiddleware = require('../middleware/userMiddleware')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config()
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
    
    if (user){
        if (bcrypt.compare(userCreds.password, user.password)){
            const jwtToken = userMiddleware.generateJWT({id: user.id})
            res.status(200).send({
                "user": user, 
                "jwtToken": jwtToken
            })
            
            return 
        }
        else{
            res.status(401).send({"detail":"Incorrect Password"})
        }
    }
    else{
        res.status(401).send({"detail":"Invalid User"})

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
            const salt = await bcrypt.genSalt(parseInt(saltSize))
            const hashedPwd = await bcrypt.hash(userCreds.password, salt)
            userCreds.password = hashedPwd
            const newUser = new userModel(userCreds)
            await newUser.save()
            const jwtToken = userMiddleware.generateJWT({id: newUser.id})
            res.status(201).send({
                "id": newUser.id,
                "jwtToken": jwtToken
            })
        }

        catch (err){
            res.send(err.message) // error cases to be discussed
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
        res.status(200).send({"detail":"User Exists"})
        return 
    }
    else{
        res.status(404).send({"detail":"User not found"})
        return 
    }

})


router.post('/set-subscription', async(req, res) =>{
    const jwtToken = req.header('Authorization').split(' ')[1]
    const subData = req.body
    userDetails = {
        subscription: subData.subscription,
        id: ''
    }

    if (!jwtToken || jwtToken===''){
        res.status(401).send({"detail":"Unauthorized access, please login again"})
        return 
    }


    try{
        userDetails.id = userMiddleware.verifyJWT(jwtToken)
    }
    catch(err){
        res.status(401).send({"detail": err.message})
        return
    }


    if (!mongoose.Types.ObjectId.isValid(userDetails.id)){
        res.status(400).send({"detail":"Invalid ID"})
        return 
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

router.get('/validate-token', async(req, res) => {
    const jwtToken = req.header('Authorization').split(' ')[1]

    if (!jwtToken || jwtToken===''){
        res.status(401).send({ "detail":"Unauthorized access, please login again" })
        return 
    }

    try{
        userId = userMiddleware.verifyJWT(jwtToken)
    }
    catch(err){
        res.status(401).send({ "detail": err.message })
        return
    }

    res.status(200).send({ "detail": "Authorized" })
})

module.exports = router