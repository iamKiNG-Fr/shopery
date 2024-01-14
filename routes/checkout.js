const express = require('express')
const router = express.Router()

const {checkOut} = require('../controllers/checkout.js')

//check out cart
router.post('', checkOut)

//get only one ad
// router.get('/:id', getOneAd)

module.exports = router
