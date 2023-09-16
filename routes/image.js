const express = require('express')
const router = express.Router()
const multer = require('multer')

// Multer file storage engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb)=>{
        cb(null, 'shopery_' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})


router.post('/single', upload.single('image'), (req, res)=>{
    // console.log(req.file);
    req.flash("success", `${req.file.filename} uploaded successfully`)
    res.status(200).redirect('/images');
    
})
router.post('/multiple', upload.array('images', 10), (req, res)=>{
    // console.log(req.files);
    req.flash("success", `${req.files.length} images uploaded successfully`)
    res.status(200).redirect('/images');
})
 

module.exports = router