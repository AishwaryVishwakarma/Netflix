const express = require('express')
const router = express.Router()
const userModel = require('../schema/userSchema')
const userProfileModel = require('../schema/userProfilesSchema')



router.get('/userProfile', async(req, res) => {
    const userEmail = req.body
    const userInstanse = await userModel
        .findOne({ email: userEmail.email })
        .exec()
    const newuserprofilemodel = await userProfileModel
        .findOne({ user_id: userInstanse.id })
        .exec()
    await newuserprofilemodel.save()
    res.send(newuserprofilemodel)
})

module.exports = router