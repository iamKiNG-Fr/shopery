const express = require('express')
const router = express.Router()

const {getWishlist, addToWishlist} = require('../controllers/wishlist.js')


router.get('', getWishlist)

//add to Cart
router.post('/add/:id', addToWishlist)

module.exports = router