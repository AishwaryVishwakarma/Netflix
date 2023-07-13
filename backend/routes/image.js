const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dozlitxt5',
    api_key: '444587272179522',
    api_secret: 'DyEWzytnIDalR-qVVJgmakE8CyE'
})

const multer = require('multer')
const path = require('path')

// Multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});

const express = require('express')
const router = express.Router()

const imageModel = require('../schema/imageSchema')

router.post('/image', upload.single("image"), async (req, res) => {
    try {
        console.log(req.file.path)
        const result = await cloudinary.uploader.upload(req.file.path, {folder: 'netflix'})
        console.log(result)

        let image = new imageModel({
            name: req.body.name,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id
        })

        await image.save()
        res.status(200).send({"image":image})
    }
    catch(err){
        console.log(err)
        res.status(err.http_code).send(err.message)
    }
})

module.exports = router