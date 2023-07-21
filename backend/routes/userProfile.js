const express = require('express')
const router = express.Router()
const userProfileModel = require('../schema/userProfilesSchema')
const userMiddleware = require('../middleware/userMiddleware')



router.get('/user-profile', userMiddleware.authenticateJWT, async(req, res) => {
    const userId = req.user

    try{
        const profile = await userProfileModel
            .findOne({ 'meta.user_id': userId })
            .exec()
            
        res.status(200).send({ "user_profile": profile })
    }
    catch(err){
        res.status(404).send({ "detail": err.message })
    }
})


router.post('/create-profile', userMiddleware.authenticateJWT, async(req, res) => {
    const userId = req.user
    const newProfile = req.body

    const userProfile = await userProfileModel
        .findOne({ 'meta.user_id': userId })
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

router.put('/update-profile/:user_profile_id', userMiddleware.authenticateJWT, async(req, res) => {
    const userId = req.user
    const userProfileId = req.params.user_profile_id
    const profile = req.body

    try{
        const userProfile = await userProfileModel.findOne({ _id: userProfileId })
        if (userProfile.meta.user_id.equals(userId) === false){
            res.status(400).send({"detail": "User Mismatch"})
            return
        }
        const updateProfile = userProfile.profiles.id(profile._id)
        updateProfile.set(profile)
        await userProfile.save()
        res.status(200).send({ "user_profile": userProfile })
    }
    catch(err){
        res.status(400).send({ "detail": err.message })
    }

})

router.delete('/delete-profile/:user_profile_id', userMiddleware.authenticateJWT, async(req, res) =>{
    const userId = req.user
    const profile = req.body
    const userProfileId = req.params.user_profile_id

    try{
        const userProfile = await userProfileModel.findOne({ _id: userProfileId})

        if (userProfile.meta.user_id.equals(userId) === false){
            res.status(400).send({"detail": "User Mismatch"})
            return
        }

        const deleteProfile = userProfile.profiles.id(profile._id)

        if ( deleteProfile == null ){
            res.status(404).send({"detail":"Profile Not Found"})
            return 
        }

        if ( deleteProfile.meta.deletable === false ){
            res.status(406).send({"detail": "Cannot delete this profile"})
            return 
        }

        deleteProfile.deleteOne()
        userProfile.meta.profile_creation_available = true
        await userProfile.save()
        
        res.status(200).send({"detail":"Successful"}) // accepted but nothing to return

    }
    catch(err){
        res.send({ "detail": err.message })
    }

})


module.exports = router