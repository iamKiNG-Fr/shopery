//passport
const initializePassport = require('../passportConfig')
const passport = require('passport')
initializePassport(passport)

// route protection
const ensureNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // If the user is not authenticated, allow access to the route
        return next();
    }

    // If the user is already authenticated, send an error response
    return res.status(403).json({ message: "Already logged in"});
}

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // If the user is not authenticated, errror message shows
        return next();
    }
    return res.status(403).json({ message: "You do not have access to this route, log in" });
    
    // If the user is already authenticated, allow proceed
}
const hi = (req, res, next) => {
   console.log('hi');
   return next()
}

const login = (req, res)=> {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // Then you can send your json as response.
    console.log(req.session);
    res.json({message:"Success", user: req.user.email});
};

const logout = (req, res, next)=>{
    req.logout(err => {
        if (err){
            return next(err)
        }
    })
    res.send("logout successful")
}
module.exports = {login, logout, hi, ensureNotAuthenticated, ensureAuthenticated}