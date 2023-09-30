const {Products} = require('../sequelize/models');
const products = require('../sequelize/models/products');

// class Cart {
//     constructor(oldCart) {
//         console.log(oldCart.items);
//         this.items = oldCart.items || {};
//         this.totalQty = oldCart.totalQty || 0;
//         this.totalPrice = oldCart.totalPrice || 0;
//     }
// }

// Cart.prototype.add = (item, id) => {

//     // console.log(item ,id);
//     // console.log(this.items)    
//     var storedItem = this.items;
//     if (!storedItem) {
//         console.log('here1');
//         storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
//     }
//     console.log('here2');
//     storedItem.qty++;
//     storedItem.price = storedItem.item.price * storedItem.qty;
//     this.totalQty++;
//     this.totalPrice += storedItem.item.price;
// };

// Cart.prototype.generateArray = () => {
//     var arr = [];
//     for (var id in this.items) {
//         arr.push(this.items[id]);
//     }
//     return arr;
// };

const getCart = async (req, res) => {

    const cart = req.session.cart
    if (!cart) {
        return res.status(200).send("No products in cart")
    }
    return res.status(200).json({cart})
}

//get all the ads
const addToCart = async (req,res) => {
    try {

        const productId = req.params.id
        
        // this adds new cart and checks if carts already exists in session, if it exist the existing cart is passed to th function, if it doesnt exist an empty object is passed.
        // var cart = new Cart(req.session.cart ? req.session.cart : {})
       
        const product = await Products.findOne({where: {id : productId}})
        
        if (product != null) {
            
            
            
            // cart.add(product, product.id);
            // console.log('main route here');
            // req.session.cart = cart
            // console.log( req.session.cart);

            if (!req.session.cart) {
                // console.log(here);
                req.session.cart = []
                req.session.cart.push({
                    productId: productId,
                    name: product.productName,
                    qty: 1,
                    price: Number(product.productPrice),
                    Image: product.productThumbnail,
                    subtotal: Number(product.productPrice)
                })
            } else {
                const cart = req.session.cart
                console.log(cart);
                var isNewItem = true
            
                for (let item = 0; item < cart.length; item++) {
                    if (cart[item].productId == productId) {
                        cart[item].qty++;
                        cart[item].subtotal+=cart[item].price;
                        isNewItem = false
                    }
                }
            
                if (isNewItem) {
                    cart.push({
                        productId: productId,
                        name: product.productName,
                        qty: 1,
                        price: Number(product.productPrice),
                        image: `${product.productThumbnail}`,
                        subtotal: Number(product.productPrice)
                    })
                }
            
            }

            return res.status(200).json({message: `${product.productName} added to cart`})
            
        } else {
            
            return res.status(200).json({message: "product to be added does not exist"})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong", error})
    }
}


module.exports = {getCart, addToCart}
