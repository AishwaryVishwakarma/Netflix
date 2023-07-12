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

module.exports = router