const express = require('express')
const router = express.Router()
const {getUsers, getOneUser, addUser, updateUser, deleteUser} = require('../controllers/users')
const {ensureAuthenticated} = require('../controllers/authControllers')
//passport
const initializePassport = require('../passportConfig')
const passport = require('passport')
initializePassport(passport)


//get all users
router.get('', getUsers)

router.get('/profile', (req, res) => {
    console.log(req.user);
    return res.status(200).send(`omo`)
})

//get single user
router.get('/:uuid', ensureAuthenticated, getOneUser)

//add user
router.post('', addUser)

//update user
router.put('/edit/:uuid', updateUser)

//delete user
router.delete('/:uuid', deleteUser)

module.exports = router