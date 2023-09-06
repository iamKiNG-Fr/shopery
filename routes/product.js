const express = require('express')
const router = express.Router()

const {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/product.js')


// get all categories
router.get('', getProducts)

// create category
router.post('', createProduct)

// get one category
router.get('/:uuid', getOneProduct)

// update category
router.patch('/:uuid', updateProduct)

router.delete('/:uuid', deleteProduct)

module.exports = router