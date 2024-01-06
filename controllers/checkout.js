// const {ads} = require('../sequelize/models');

const { name } = require("ejs")

const checkout = (req, res) => {
    name
    email
    phone
    city
    address
    cost = req.session.total
    
    return res.status(200).send("checkout")
}

module.exports = {checkout}