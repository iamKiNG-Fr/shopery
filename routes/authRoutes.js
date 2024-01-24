const express = require('express')
const router = express.Router()
const {login, logout, hi, ensureAuthenticated, ensureNotAuthenticated} = require('../controllers/authControllers')

const initializePassport = require('../passportConfig')
const passport = require('passport')

initializePassport(passport)

//routes

router.post('/login', ensureNotAuthenticated, (req, res, next) => {
     passport.authenticate('local', (err, user, info)=>{
    if (err){
        console.error(err);
        return res.status(500).json({message: "server error"})
    }
    if (!user){
        return res.status(401).json({message: "unauthorized"})
    }

    // Using req.login
    req.login(user, (loginErr) => {
        if (loginErr) {
        return res.status(500).json({ error: 'Internal Server Error during login' });
        }
        
        if (req.session.cart) {
            console.log("<<<here>>>");
            user.cart = req.session.cart;
            user.save(); // Save the user with the updated cart
          }

        // Now req.user should be set to the authenticated user
        return next()
    });
    })(req, res, next) 
}, login)

router.post('/logout', logout)


// passport.authenticate('local', {
//     successRedirect: '/api/v1/user/profile',
//     failureRedirect: '/api/v1/user',
//     failureFlash: true
// })
module.exports = router
