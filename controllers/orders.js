const {ShoperyOrders} = require('../sequelize/models');

const getOrders = (req, res) => {
    return res.status(200).send("orders")
}

const addOrder = async (req, res) => {
    try{

        const {paymentMethod, userId, shippingAddressId, orderTotal, statusId} = req.body;
        
        
        const product = await Products.findOne({where: {productName}})
        
        // console.log(product);
        if(product == null){
            
            return res.json({message: `product does not exist`})
            
        } else {
            
            const productId = product.id           
            const hotDeal = await HotDeals.findOne({where: {productId}})
            
            if (hotDeal != null) {
                
                return res.json({message: `${productName} is already a hotDeal`})
            } else {
                
                await HotDeals.create({productId})
                
                return res.status(200.).json({message: `new product ${productName} is now a hotDeal`})

            }

        }
            
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

const getOneOrder = (req, res) => {
    return res.status(200).send("orders")
}

module.exports = {getOrders, addOrder, getOneOrder}