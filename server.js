require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5300

//middleware
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//view engine
app.set('view engine', 'ejs')

//Database
const { sequelize} = require('./sequelize/models') 

const connectDb = async () => {
    await sequelize.authenticate()
    await sequelize.sync()
}

//routes
const categoryRoute = require('./routes/category.js')
const productRoute = require('./routes/product.js')
const productTypeRoute = require('./routes/productType.js')
const imageRoute = require('./routes/image.js')

app.get('/', (req, res)=>{
    res.status(200).render("index");
})

app.use('/image', imageRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/productType', productTypeRoute)

app.listen(PORT, async ()=>{
    console.log(`connected on port ${PORT}`);
    await connectDb()
    console.log('Database Connected!');
})

