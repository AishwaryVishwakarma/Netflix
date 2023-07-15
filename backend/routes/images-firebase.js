// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app")
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage")
// const { getAnalytics } = require("firebase/analytics")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdEpf6KDILaFJ1cPOlz2JqI4Zq712uo4U",
  authDomain: "images-b41a8.firebaseapp.com",
  projectId: "images-b41a8",
  storageBucket: "images-b41a8.appspot.com",
  messagingSenderId: "868115336756",
  appId: "1:868115336756:web:3764bc7af74d1acd690461",
  measurementId: "G-2RH4TZFND0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const multer = require('multer')
const express = require('express')
const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage({})
})


router.post("/upload-firebase", upload.single("image"), async (req, res) =>{
    try{
        // console.log(req.file)
        const dateTime = giveCurrentDateTime();

        const storage = getStorage(app)
        const storageRef = ref(storage, `files/${req.body.name + "       " + dateTime}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        // console.log(snapshot)
        
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        // console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    const dateTime = date + ' ' + time
    return dateTime
}


module.exports = router