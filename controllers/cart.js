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
    let total = cart.reduce(
        (acc, currentItem)=>{
            return acc + currentItem.subtotal
        },
        0
    )
    return res.status(200).json({cart, total})
}

//get all the ads
const addToCart = async (req,res) => {
    try {

        const productId = req.params.id
        const {quantity} = req.body
        // console.log(req.session);
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
                    qty: quantity,
                    price: Number(product.productPrice),
                    Image: product.productThumbnail,
                    subtotal: Number(product.productPrice)*quantity
                })
            } else {
                const cart = req.session.cart
                // console.log(cart);
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
                        qty: quantity,
                        price: Number(product.productPrice),
                        image: `${product.productThumbnail}`,
                        subtotal: Number(product.productPrice)*quantity
                    })
                }
            
            }

            return res.status(200).json({message: `${quantity} ${product.productName} added to cart`, Cart: req.session.cart})
            
        } else {
            
            return res.status(200).json({message: "product to be added does not exist"})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong", error})
    }
}

const removeFromCart = async (req, res) => {

    try {
        const productId = req.params.id 
        const product = await Products.findOne({where: {id : productId}})
        const cart = req.session.cart
        const {quantity} = req.body
        console.log(cart);

        if (cart.length === 0){
            return res.status(200).json({message:`Cart is empty`}) 
        }
        else{
            for (let item = 0; item < cart.length; item++) {
                if (cart[item].productId == productId) {
                    if (cart[item].qty <= 1){
                        cart.splice(item,1)
                        return res.status(200).json({message: `${product.productName} removed from cart`})
                    } 
                    cart[item].qty-=quantity
                    cart[item].subtotal-=cart[item].price*quantity;
                    return res.status(200).json({message:`${product.productName} Quantity reduced by ${quantity}`, Cart: req.session.cart})
                } else {
                    return res.status(200).json({message:`${product.productName} not in cart`, Cart: req.session.cart})        
                }
            }
        }
    

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong", error})
    }
}


module.exports = {getCart, addToCart, removeFromCart}

