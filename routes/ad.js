const express = require('express')
const router = express.Router()

const {getAllAds, getOneAd, addAd, removeAd, updateAd} = require('../controllers/ad.js')

//get all the ads
router.get('', getAllAds)

//get only one ad
router.get('/:id', getOneAd)

//add an ad
router.post('', addAd)

//update an ad
router.put('/:id', updateAd)

//delete an ad
router.delete('/:id', removeAd)

module.exports = router