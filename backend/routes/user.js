const express = require('express')
const router = express.Router()
const userModel = require('../schema/userSchema')
const userMiddleware = require('../middleware/userMiddleware')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userProfileModel = require('../schema/userProfilesSchema')

dotenv.config()

const saltSize = process.env.SALT_SIZE

router.post('/login', async(req,res) =>{
    const userData = req.body
    const userCreds = {
        email: userData.email,
        password: userData.password,
        remember_me: ''
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
    
    if (!user || (! await bcrypt.compare(userCreds.password, user.password))){
        res.status(401).send({"detail":"Invalid Credentials"})
        return 
    }

    try{
        userCreds.remember_me = Boolean(userCreds.remember_me)
        const jwtToken = userMiddleware.generateJWT({ id: user.id, remember_me: userCreds.remember_me })
        user.last_log_in = Date.now()
        await user.save()
        const userprofile = await userProfileModel.findOne({ user_id: user.id })
        user.password = undefined
        res.status(200).send({
            "user": user, 
            "jwtToken": jwtToken,
            "userprofile": userprofile
        })
    }
    catch(err){
        res.status(401).send({ "detail": err.message })
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
        res.status(409).send({ "detail":"User Already Exists" }) // status code for conflict 
        return 
    }

    try{
        const salt = await bcrypt.genSalt(parseInt(saltSize))
        const hashedPwd = await bcrypt.hash(userCreds.password, salt)
        userCreds.password = hashedPwd
        const newUser = new userModel(userCreds)
        await newUser.save()
        const userprofile = new userProfileModel({
            user_id: newUser._id
        })
        await userprofile.save()
        const jwtToken = userMiddleware.generateJWT({ id: newUser.id })
        res.status(201).send({
            "id": newUser.id,
            "jwtToken": jwtToken,
            "userprofile": userprofile
        })
    }
    catch (err){
        res.status(401).send({ "detail": err.message }) // error cases to be discussed
    }
})


router.post('/checkuser', async(req, res) =>{
    const userData = req.body
    const userCreds = {
        email : userData.email
    }

    const found = await userModel
        .findOne({email: userCreds.email})
        .exec()
    

    if (found === null){
        res.status(404).send({ "detail":"User not found" })
        return 
    }

    res.status(200).send({ "detail":"User Exists" })
})


router.post('/set-subscription', async(req, res) =>{
    const jwtToken = req.header('Authorization').split(' ')[1]
    const subData = req.body
    const userDetails = {
        subscription: subData.subscription,
        id: ''
    }

    if (!jwtToken || jwtToken===''){
        res.status(401).send({ "detail":"Unauthorized access, please login again" })
        return 
    }


    try{
        userDetails.id = userMiddleware.verifyJWT(jwtToken)
    }
    catch(err){
        res.status(401).send({ "detail": err.message })
        return
    }


    if (!mongoose.Types.ObjectId.isValid(userDetails.id)){
        res.status(400).send({ "detail":"Invalid ID" })
        return 
    }
    
    const user = await userModel
        .findOne({ _id: userDetails.id })
        .exec()
    
    if (user === null){
        res.status(404).send({ "detail":"User Not Found" })
        return 
        
    }
    try{
        user.subscription.type = userDetails.subscription.type
        user.subscription.value = userDetails.subscription.value
        await user.save()
        res.status(200).send({ "detail":"Subscription details added successfully" }) 
    }
    catch(err){
        res.status(401).send({ "detail": err.message })
    }
    
})

router.get('/validate-token', async(req, res) => {
    const jwtToken = req.header('Authorization').split(' ')[1]

    if (!jwtToken || jwtToken===''){
        res.status(401).send({ "detail":"Unauthorized access, please login again" })
        return 
    }

    try{
        var userId = userMiddleware.verifyJWT(jwtToken)
    }
    catch(err){
        res.status(401).send({ "detail": err.message })
        return 
    }
    
    const user = await userModel
            .findOne({ _id: userId })
            .exec()
    
    if (!user){
        res.status(401).send({ "detail": "User Not Found"})
        return 
    }

    res.status(200).send({ "detail": "Authorized" })
    
})

module.exports = router