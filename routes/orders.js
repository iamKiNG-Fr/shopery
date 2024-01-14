const express = require('express')
const router = express.Router()

const {getOrders, addOrder, getOneOrder} = require('../controllers/orders.js')

//get all Orders
router.get('', getOrders)

//add an Oreder
router.get('', addOrder)

//get only one Order
router.get('/:id', getOneOrder)

module.exports = router
