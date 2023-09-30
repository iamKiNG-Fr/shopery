const express = require('express')
const router = express.Router()

const {getCart, addToCart} = require('../controllers/cart.js')


router.get('', getCart)

//add to Cart
router.post('/add/:id', addToCart)

module.exports = router