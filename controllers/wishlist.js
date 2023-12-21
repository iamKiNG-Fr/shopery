const {Products, Wishlist, Customers} = require('../sequelize/models');

const getWishlist = async (req, res) => {

    const customer = req.user
    
    if (!customer) {
        
        return res.status(401).send("You must be logged in to view Wishlist")
        
    }
    const wishlist = await Wishlist.findAll({where: {customerId: customer.uuid}})
    
    if (wishlist.length > 0) {
        
        return res.status(200).json(wishlist)
        
    }
    
    return res.status(200).send("No products in Wishlist")
}

//get all the ads
const addToWishlist = async (req,res) => {
    try {

        const productId = req.params.id
        
        const customerUUID = req.user.uuid
        
        if (!customerUUID) {
            
            return res.status(401).send("You must be logged in to add to Wishlist")
        
        }
    
        const customer = await Customers.findOne({where: {uuid: customerUUID}})
        const product = await Products.findOne({where: {id: productId}})

        const customerWishlist = await Wishlist.findAll({where: {customerId: customer.id, productId}})

        if (customerWishlist === null) {
            
            await Wishlist.create({productId, customerId: customer.id})
            return res.status(200.).json({message: `added ${product.productName} to wishlist`})

        } else {

            return res.json({message: `${categoryName} aleady in your wishlist`})

        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong", error})
    }
}


module.exports = {getWishlist, addToWishlist}

