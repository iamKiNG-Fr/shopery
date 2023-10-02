const express = require('express')
const router = express.Router()
const multer = require('multer')
const {ProductGallery, Products} = require('../sequelize/models')
const productgallery = require('../sequelize/models/productgallery')

// Multer file storage engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb)=>{
        cb(null, 'shopery_' + file.originalname)
    }
})

const fileStorageEngine2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/productGallery')
    },
    filename: (req, file, cb)=>{
        const productName = req.body.name

        cb(null, 'shopery_'+ productName + '_' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})
const upload2 = multer({storage: fileStorageEngine2})


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

router.post('/gallery', upload2.array('gallery', 4), async (req, res)=>{
    
    const productName = req.body.name
    const images = req.files;

    const product = await Products.findOne({where:{productName}}) 

    // console.log(productName);
    // console.log(product);

    if (product != null) {

        const imageNames = images.map((image) => image.filename)
       
        imageNames.forEach(async (imagename)=> {
            await ProductGallery.create({productId: product.id, link: "https://shopery.onrender.com/images/"+imagename})
        })

        return res.status(200.).json({message: `images for ${productName} added`})

    } else {

        console.log('product not found');
        
    }

    res.status(200).redirect('/images');
})
 

module.exports = router