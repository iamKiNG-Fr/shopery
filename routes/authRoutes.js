const express = require('express')
const {Cart, CartItem} = require('../sequelize/models')

const router = express.Router()
const {login, logout, hi, ensureAuthenticated, cartStore, ensureNotAuthenticated} = require('../controllers/authControllers')

const initializePassport = require('../passportConfig')
const passport = require('passport')

initializePassport(passport)

//routes

router.post('/login', cartStore, ensureNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info)=>{
    if (err){
        console.error(err);
        return res.status(500).json({message: "server error"})
    }
    if (!user){
        return res.status(401).json({message: "unauthorized"})
    }

    // Using req.login
    req.login( user, async (loginErr) => {
        if (loginErr) {
        return res.status(500).json({ error: 'Internal Server Error during login' });
        }

        console.log(req.session);

        if (req.cartData) {

            const cart = req.cartData
            const {productId, qty}= req.cartData;

            const storedCart = await Cart.create({userId: req.user.id})
            
            for(const item in cart){
                await CartItem.create({cartId: storedCart.id, productId: item.productId, quantity: item.quantity})
            }
           
            console.log("<<<added to req.user.cart>>>");
        }
        //remove cartdata from req
        delete req.cartData
        
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
