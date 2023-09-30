const express = require('express')
const router = express.Router()

const {getAllTags, addTag, setProductTag, getTagProducts, getProductTags} = require('../controllers/tag.js')

//get tag
router.get('', getAllTags)

//add tag
router.post('', addTag)

//set prouct tag
router.post('/producttag', setProductTag)

//get tags under product
router.get('/producttag/:productid', getProductTags)

//get products under tag
router.get('/:tagname', getTagProducts)

module.exports = router