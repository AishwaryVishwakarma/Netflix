const mongoose = require('mongoose')


const imageSchema = new mongoose.Schema({
    name: String,
    profile_img: String,
    cloudinary_id: String
})


const imageModel = mongoose.model('images', imageSchema)
module.exports = imageModel