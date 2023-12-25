const express = require('express')
const router = express.Router()
const {login, logout, hi, ensureAuthenticated, ensureNotAuthenticated} = require('../controllers/authControllers')

const initializePassport = require('../passportConfig')
const passport = require('passport')

initializePassport(passport)

//routes

router.post('/login', ensureNotAuthenticated, passport.authenticate('local'), login)

router.post('/logout', logout)


// passport.authenticate('local', {
//     successRedirect: '/api/v1/user/profile',
//     failureRedirect: '/api/v1/user',
//     failureFlash: true
// })
module.exports = router
