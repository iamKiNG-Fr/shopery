const express = require('express')
const router = express.Router()

const {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/product.js')


// get all categories
router.get('', getProducts)

// create category
router.post('', createProduct)

// get one category
router.get('/:product', getOneProduct)

// update category
router.patch('/:product', updateProduct)

router.delete('/:product', deleteProduct)

module.exports = router