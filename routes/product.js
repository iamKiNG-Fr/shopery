const express = require('express')
const router = express.Router()

const {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct, getFeaturedProducts, addFeaturedProduct, removeFeaturedProduct} = require('../controllers/product.js')


// get all products
router.get('', getProducts)

// create product
router.post('', createProduct)

// get all featured products
router.get('/featured', getFeaturedProducts)

//  add to featured product
router.post('/featured', addFeaturedProduct)

//remove from Featured
router.delete('/featured/:product', removeFeaturedProduct)

// get one product
router.get('/:product', getOneProduct)

// update product
router.put('/:product', updateProduct)

// delete product
router.delete('/:product', deleteProduct)



module.exports = router