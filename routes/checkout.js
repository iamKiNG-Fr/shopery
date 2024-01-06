const express = require('express')
const router = express.Router()

const {checkout} = require('../controllers/checkout.js')

//get all the ads
router.get('', checkout)

//get only one ad
// router.get('/:id', getOneAd)

module.exports = router
