const express = require('express')
const router = express.Router()
const userProfileModel = require('../schema/userProfilesSchema')
const userMiddleware = require('../middleware/userMiddleware')



router.get('/user-profile', async(req, res) => {
    const jwtToken = req.header('Authorization').split(' ')[1]

    if (!jwtToken || jwtToken===''){
        res.status(401).send({ "detail":"Unauthorized access, please login again" })
        return 
    }

    try{
        var user_id = userMiddleware.verifyJWT(jwtToken)
    }
    catch(err){
        res.status(401).send({ "detail": err.message })
        return
    }

    const profile = await userProfileModel
        .findOne({ 'meta.user_id': user_id })
        .exec()

    res.send({ "user_profile": profile })
})


router.post('/create-profile', async(req, res) =>{
    const newProfile = req.body

    const jwtToken = req.header('Authorization').split(' ')[1]

    if (!jwtToken || jwtToken===''){
        res.status(401).send({ "detail": "Unathorized access, please login again" })
        return
    }

    try{
        var user_id = userMiddleware.verifyJWT(jwtToken)
    }
    catch(err){
        res.status(401).send({ "detail": err.message })
        return
    }

    const userProfile = await userProfileModel
        .findOne({ 'meta.user_id': user_id })
        .exec()


    if (userProfile.meta.profile_creation_available === false){
        res.status(406).send({ 'detail': 'Exceeded Number of Profiles' }) // status code for 'Not Acceptable'
        return
    }

    try{
        if ( userProfile.profiles.length === 4){
            userProfile.meta.profile_creation_available = false
        }
        userProfile.profiles.push({
            name: newProfile.name,
            icon: newProfile.icon
        })

        if ( userProfile.meta._index === 9 ){
            userProfile.meta._index = -1
        }

        userProfile.meta._index += 1
        await userProfile.save()
        res.status(201).send({ 'detail': 'User Profile Created' })
    }
    catch(err){ 
        res.status(406).send({ 'detail': err.message })
    }

})
module.exports = router