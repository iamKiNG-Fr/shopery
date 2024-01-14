const {Products, ShoperyOrders, OrderStatus, ShippingAddress, Users, ShoperyOrderDetails} = require('../sequelize/models');

const checkOut = async (req, res) => {
    try{

        const {paymentMethod, statusId} = req.body;
        
        const {cart} = req.session

        const uuid = req.user.uuid

        if (!cart) {
            return res.status(404).json({message:"cart is empty"})
        }

        let orderTotal = 0
        
        for(const cartItem of cart){
            const product = await Products.findOne({where: {id: cartItem.productId}})
            const price = product.productPrice
            const quantity = cartItem.qty
            const subtotal = price * quantity 
            orderTotal += subtotal
        }

        const user = await Users.findOne({where: {uuid}})

        const userId = user.id

        const shippingAddress = await ShippingAddress.findOne({where: {userId}})

        if (!shippingAddress) {
            return res.status(404).json({message:"No shipping Address"})
        }

        const shippingAddressId = shippingAddress.id
        
        const shoperyOrder = await ShoperyOrders.create({paymentMethod, userId, shippingAddressId, orderTotal, statusId})
        
        for (let cartItem = 0; cartItem < cart.length; cartItem++) {
            
            const {productId, qty} = cart[cartItem];
            
            const product = await Products.findOne({where: {id: productId}})

            await ShoperyOrderDetails.create({productId, orderId: shoperyOrder.id, orderItemQuantity: qty, orderItemPrice: product.productPrice})
        }
        
        return res.status(200.).json({message: `order #${shoperyOrder.id} successful`})
            
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

module.exports = {checkOut}