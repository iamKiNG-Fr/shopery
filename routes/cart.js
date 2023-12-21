const express = require('express')
const router = express.Router()

const {getCart, addToCart, removeFromCart} = require('../controllers/cart.js')


router.get('', getCart)

//add to Cart
router.post('/add/:id', addToCart)


router.post('/remove/:id', removeFromCart)



module.exports = router