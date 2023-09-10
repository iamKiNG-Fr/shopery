const express = require('express')
const router = express.Router()

const {getProductTypes, getOneProductType, createProductType, updateProductType, deleteProductType} = require('../controllers/productType.js')


// get all categories
router.get('', getProductTypes)

// create ProductType
router.post('', createProductType)

// get one ProductType
router.get('/:uuid', getOneProductType)

// update ProductType
router.patch('/:uuid', updateProductType)

router.delete('/:uuid', deleteProductType)

module.exports = router