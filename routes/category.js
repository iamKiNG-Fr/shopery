const express = require('express')
const router = express.Router()

const {getCategories, getOneCategory, createCategory, updateCategory, deleteCategory, getCategoryProducts} = require('../controllers/category.js')


// get all categories
router.get('', getCategories)

//get all product in a category
router.get('/:category', getCategoryProducts)

// create category
router.post('', createCategory)

// get one category
router.get('/:uuid', getOneCategory)

// update category
router.patch('/:uuid', updateCategory)

router.delete('/:uuid', deleteCategory)

module.exports = router