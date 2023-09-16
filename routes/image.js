const express = require('express')
const router = express.Router()
const multer = require('multer')

// Multer file storage engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb)=>{
        cb(null, 'shopery_' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})


router.post('/single', upload.single('image'), (req, res)=>{
    console.log(req.file);
    res.status(200).send(`image ${req.file.filename} uploaded successful`);
})
router.post('/multiple', upload.array('images', 10), (req, res)=>{
    console.log(req.files);
    res.status(200).send("multiple images uploaded successful");
})
 

module.exports = router