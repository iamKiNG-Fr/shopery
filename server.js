require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const app = express()
const fs = require('fs').promises
const path = require('path')
const flash = require('express-flash')
const { sequelize, Users, Cart, CartItem, Products} = require('./sequelize/models') 
const PORT = process.env.PORT || 5300

// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var myStore = new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
});

// Middleware to fetch and store the user's cart in the session
const loadUserCart = async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        // Assuming you have associations set up in your models
        const cart = await Cart.findAll({where: {userId: req.user.id}});
        
        if (cart.length > 0) {
            // get users last cart
            const lastCart = cart.slice(-1)[0]

            for(const item of lastCart){
                const {productId, quantity} = await CartItem.findAll({where:{cartId: item.id}})
                const {productName, productPrice, productImage} = await Products.findAll({where:{id: productId}})
                const cartProductDetails = {productId, name: productName, qty: quantity, price: productPrice, image: productImage}
                req.session.cart += cartProductDetails
            }
        }
        } catch (error) {
        console.error(error);
      }
    }
    next();
  };
  


//middleware
app.set("trust proxy", 1)
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(cors({
    origin:["http://localhost:3000", "https://shopery.vercel.app", "https://shopery-fortune-u.vercel.app"],
    credentials: true
}));
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: myStore,
    cookie: {
        sameSite: 'None',
        maxAge: 180 * 60 * 1000,
        secure: true
    }
}))
app.use(passport.initialize()) // init passport on every route call.
app.use(passport.session()) // allow passport to use "express-session".
app.use(passport.authenticate('session')) //configuring Passport.js to use the session-based authentication strategy for user authentication.
app.use(flash())
// Use the load user cart middleware
app.use(loadUserCart);

//make sessions available in views
app.get('*', (req,res,next)=>{
    res.locals.cart = req.session.cart
    next();
})

//view engine
app.set('view engine', 'ejs')

//Database
const connectDb = async () => {
    myStore.sync();
    await sequelize.authenticate()
    await sequelize.sync()
}

//Backend Front page
app.get('/', (req, res)=>{
    res.status(200).render("index");
})
app.get('/images', async (req, res)=>{
    // const dirpath = path.join(__dirname, './public/images')
    const dirpath = './public/images'
    const dirpat2 = './public/productGallery'
    // console.log('<<<<here>>>>>', dirpath);
    const images = await fs.readdir(dirpath, (err, files)=>{
        if(err){
            return console.log(err);
        }
        return files
    }) 
    const gallery = await fs.readdir(dirpat2, (err, files)=>{
        if(err){
            return console.log(err);
        }
        return files
    }) 
    // console.log('<<<<here>>>>>', images);
    res.status(200).render("images", {images, gallery, message : req.flash('success')});
})
app.get('/docs', (req, res)=>{
    res.status(200).render("api");
})



//routes
const categoryRoute = require('./routes/category.js')
const productRoute = require('./routes/product.js')
const productTypeRoute = require('./routes/productType.js')
const imageRoute = require('./routes/image.js')
const adRoute = require('./routes/ad.js')
const cartRoute = require('./routes/cart.js')
const tagRoute = require('./routes/tag.js')
const wishlistRoute = require('./routes/wishlist.js')
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/authRoutes.js')
const ordersRoute = require('./routes/orders.js')
const checkOutRoute = require('./routes/checkout.js')

app.use('/image', imageRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/productType', productTypeRoute)
app.use('/api/v1/ads', adRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/tag', tagRoute)
app.use('/api/v1/wishlist', wishlistRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/orders', ordersRoute)
app.use('/api/v1/checkout', checkOutRoute)
app.use((req, res, next)=>{
    res.status(404).send("404 - The URL you visited does not exist on shopery")
})

app.listen(PORT, async ()=>{
    console.log(`connected on port ${PORT}`);
    await connectDb()
    console.log('Database Connected!');
})
