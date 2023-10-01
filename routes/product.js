const express = require('express')
const router = express.Router()

const {getProducts, getOneProduct, getProductsByRating, createProduct, updateProduct, deleteProduct,  getFeaturedProducts, addFeaturedProduct, removeFeaturedProduct,  getPopularProducts,addPopularProduct, removePopularProduct, getBestSellers,addBestSeller,removeBestSeller,getHotDeals, addHotDeal, removeHotDeal, getTopRated, addTopRated, removeTopRated} = require('../controllers/product.js')


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

// get all popular products
router.get('/popular', getPopularProducts)

//  add to popular product
router.post('/popular', addPopularProduct)

//remove from popular
router.delete('/popular/:product', removePopularProduct)



// BEST SELLER

// get all Best Seller products
router.get('/bestseller', getBestSellers)

//  add to Best Seller product
router.post('/bestseller', addBestSeller)

//remove from Best Seller
router.delete('/bestseller/:product', removeBestSeller)



// HOT DEALS

// get all Host Deals products
router.get('/hotdeal', getHotDeals)

//  add to Host Deals product
router.post('/hotdeal', addHotDeal)

//remove from Host Deals
router.delete('/hotdeal/:product', removeHotDeal)



// TOP RATED

// get all Top Rated products
router.get('/toprated', getTopRated)

//  add to Top Rated product
router.post('/toprated', addTopRated)
//remove from Top Rated
router.delete('/toprated/:product', removeTopRated)



// PRODUCT

// get one PRODUCT
router.get('/:product', getOneProduct)

// update PRODUCT
router.put('/:product', updateProduct)

// delete PRODUCT
router.delete('/:product', deleteProduct)

// get products by rating
router.get('/rating/:star', getProductsByRating)

module.exports = router