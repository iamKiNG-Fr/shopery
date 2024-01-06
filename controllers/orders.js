// const {ads} = require('../sequelize/models');

const getOrders = (req, res) => {
    return res.status(200).send("orders")
}

module.exports = {getOrders}