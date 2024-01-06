const express = require('express')
const router = express.Router()

const {getOrders} = require('../controllers/orders.js')

//get all the ads
router.get('', getOrders)

//get only one ad
// router.get('/:id', getOneAd)

module.exports = router
