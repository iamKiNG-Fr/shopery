const {Products, Category, ProductType, FeaturedProducts, PopularProducts, BestSellers, HotDeals, TopRated, ProductTag, Tag} = require('../sequelize/models')
const featuredproducts = require('../sequelize/models/featuredproducts')
const producttag = require('../sequelize/models/producttag')

// Get all Products
const getProducts = async(req, res) => {
    try {
    
        const products = await Products.findAll()
        
        if (products != null) {

            res.status(200).json(products)
            
        } else {
            res.json({message: "no products found"})
        }
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

// Get one Product
const getOneProduct = async(req, res) => {
    try {
    
        const productName = req.params.product

        const product = await Products.findOne({where: {productName}})

        if (product != null) {
            
            return res.status(200).json(product)

        } else {
            
            return res.status(200).json({message: `product(${productName}) does not exist`})
        }

    
    } catch (error) {
    
        // console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

//  Create Product
const createProduct = async(req, res) =>{
    
    try{

        const {productName,productThumbnail,productPrice,productDiscount,productDescription,productWeight,productColour,productStock,typeName,categoryName} = req.body;
        
        
        const exist = await Products.findOne({where: {productName}})
       
        const category = await Category.findOne({where: {categoryName}})
        
        const type = await ProductType.findOne({where: {typeName}})
        
        // console.log(req.body, exist, categoryName, type);
        
        if(exist != null){
            
           
            return res.json({message: `Product: ${productName}, aleady exist`})    
        } 
        if(category == null){
            
           
            return res.json({message: `category: ${categoryName}, does not exist, create category`})    
        } 
        if(type == null){
           
            
            return res.json({message: `Type: ${typeName}, does not exist`})    
        } 
        else{
            
            const categoryId = category.id
            const typeId = type.id
            
            
            await Products.create({productName,productThumbnail,productPrice,productDiscount,productDescription,productWeight,productColour,productStock,typeId,categoryId})
            
            return res.status(200.).json({message: `new product ${productName} added`})

        }
            
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

// Update product
const updateProduct = async (req, res) =>{
    
    try{

        const productName = req.params.product

        const exist = await Products.findOne({where: {productName}})
        
        
        if(exist != null){
            console.log(req.body);
            await Products.update(req.body, {where: {productName}})
            return res.status(200.).json({message: `${productName} successfully updated`})
        } else {
        
            return res.status(200).json({message: `product to be updated does not exist`})
        }

    } catch (error) {
    
        console.log(error);
        return res.status(404).json({message: "something went wrong"})
    
    }
} 

// Delete product
const deleteProduct = async (req, res) =>{
    
    try{

        const productName = req.params.product
      
        const removeProduct = await Products.findOne({where: {productName}})
        
        if (removeProduct != null) {
            
            await removeProduct.destroy()
            return res.status(200).json({message: `the product ${removeProduct.productName} has been deleted`})
            
        } else {
            
            return res.status(200).json({message: `the product (${productName}) to be deleted does not exist`})
        }


    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

// FEATURED PRODUCTS

// get all featured products
const getFeaturedProducts = async(req, res) => {
    try {
    
        const featuredProducts = await FeaturedProducts.findAll({include: [Products]})
        
        if (featuredProducts != null) {

            const productList = []

            for (let product = 0; product < featuredProducts.length; product++) {
                const element = featuredProducts[product].Product;
                productList.push(element)
            }

            return res.status(200).json(productList)
        } else {
            res.json({message: "no products are featured"})
        }
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

//  add to featured product
const addFeaturedProduct = async(req, res) =>{
    
    try{

        const {productName} = req.body;
        
        
        const product = await Products.findOne({where: {productName}})
        
        // console.log(product);
        if(product == null){
            
            return res.json({message: `product does not exist`})
            
        } else {
            
            const productId = product.id           
            const featured = await FeaturedProducts.findOne({where: {productId}})
            
            if (featured != null) {
                
                return res.json({message: `${productName} is already featured`})
            } else {

                await FeaturedProducts.create({productId})
                
                return res.status(200.).json({message: `new product ${productName} is now featured`})

            }

        }
            
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

//remove from Featured
const removeFeaturedProduct = async (req, res) =>{
    
    try{

        const productName = req.params.product
      
        const product = await Products.findOne({where: {productName}})
        const removeProduct = await FeaturedProducts.findOne({where: {productId: product.id}})
        
        if (removeProduct != null) {
            
            await removeProduct.destroy()
            return res.status(200).json({message: `the product ${product.productName} has been removed from featured`})
            
        } else {
            
            return res.status(200).json({message: `the product to be removed from featured does not exist`})
        }


    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

// POPULAR PRODUCTS

// get all popular products
const getPopularProducts = async(req, res) => {
    try {
    
        const popularProducts = await PopularProducts.findAll({include: [Products]})
    
        if (popularProducts != null) {

            const productList = []

            for (let product = 0; product < popularProducts.length; product++) {
                const element = popularProducts[product].Product;
                productList.push(element)
            }

            return res.status(200).json(productList)
            
        } else {
            res.json({message: "no products are popular"})
        }
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

//  add to popular product
const addPopularProduct = async(req, res) =>{
    
    try{

        const {productName} = req.body;
        
        
        const product = await Products.findOne({where: {productName}})
        
        // console.log(product);
        if(product == null){
            
            return res.json({message: `product does not exist`})
            
        } else {
            
            const productId = product.id           
            const popular = await PopularProducts.findOne({where: {productId}})
            
            if (popular != null) {
                
                return res.json({message: `${productName} is already a popular product`})

            } else {
                
                await PopularProducts.create({productId})
                
                return res.status(200.).json({message: ` ${productName} has been added to popular ptoducts`})

            }

        }
            
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

//remove from popular
const removePopularProduct = async (req, res) =>{
    
    try{

        const productName = req.params.product
      
        const removeProduct = await PopularProducts.findOne({where: {productName}})
        
        if (removeProduct != null) {
            
            await removeProduct.destroy()
            return res.status(200).json({message: `the product ${removeProduct.productName} has been removed from featured`})
            
        } else {
            
            return res.status(200).json({message: `the product to be removed from featured does not exist`})
        }


    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

// BestSeller PRODUCTS

// get all BestSeller products
const getBestSellers = async(req, res) => {
    try {
    
        const bestSeller = await BestSellers.findAll({include: [Products]})
    
        if (bestSeller != null) {

            const productList = []

            for (let product = 0; product < bestSeller.length; product++) {
                const element = bestSeller[product].Product;
                productList.push(element)
            }

            return res.status(200).json(productList)
            
        } else {
            res.json({message: "no products are BestSeller"})
        }
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

//  add to bestseller product
const addBestSeller = async(req, res) =>{
    
    try{

        const {productName} = req.body;
        
        
        const product = await Products.findOne({where: {productName}})
        
        // console.log(product);
        if(product == null){
            
            return res.json({message: `product does not exist`})
            
        } else {
            
            const productId = product.id           
            const bestSeller = await BestSellers.findOne({where: {productId}})
            
            if (bestSeller != null) {
                
                return res.json({message: `${productName} is already a Bestseller`})
            } else {
                
                await BestSellers.create({productId})
                
                return res.status(200.).json({message: `new product ${productName} is now a BestSeller`})

            }

        }
            
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

//remove from BestSeller
const removeBestSeller = async (req, res) =>{
    
    try{

        const productName = req.params.product
      
        const removeProduct = await BestSellers.findOne({where: {productName}})
        
        if (removeProduct != null) {
            
            await removeProduct.destroy()
            return res.status(200).json({message: `the product ${removeProduct.productName} has been removed from BestSeller`})
            
        } else {
            
            return res.status(200).json({message: `the product to be removed from BestSeller does not exist`})
        }


    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

// hotDeal PRODUCTS

// get all hotDeal products
const getHotDeals = async(req, res) => {
    try {
    
        const hotDeal = await HotDeals.findAll({include: [Products]})
    
        if (hotDeal != null) {

            const productList = []

            for (let product = 0; product < hotDeal.length; product++) {
                const element = hotDeal[product].Product;
                productList.push(element)
            }

            return res.status(200).json(productList)
            
        } else {
            res.json({message: "no products are hotDeal"})
        }
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

//  add to hotDeal product
const addHotDeal = async(req, res) =>{
    
    try{

        const {productName} = req.body;
        
        
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

//remove from BestSeller
const removeHotDeal = async (req, res) =>{
    
    try{

        const productName = req.params.product
      
        const removeProduct = await HotDeals.findOne({where: {productName}})
        
        if (removeProduct != null) {
            
            await removeProduct.destroy()
            return res.status(200).json({message: `the product ${removeProduct.productName} has been removed from Hot Deal`})
            
        } else {
            
            return res.status(200).json({message: `the product to be removed from Hot Deals does not exist`})
        }


    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

// Top Rated PRODUCTS

// get all Top Rated products
const getTopRated = async(req, res) => {
    try {
    
        const topRated = await TopRated.findAll({include: [Products]})
    
        if (topRated != null) {

            const productList = []

            for (let product = 0; product < topRated.length; product++) {
                const element = topRated[product].Product;
                productList.push(element)
            }

            return res.status(200).json(productList)
            
        } else {
            res.json({message: "no products are Top Rated"})
        }
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

//  add to Top Rated product
const addTopRated = async(req, res) =>{
    
    try{

        const {productName} = req.body;
        
        
        const product = await Products.findOne({where: {productName}})
        
        // console.log(product);
        if(product == null){
            
            return res.json({message: `product does not exist`})
            
        } else {
            
            const productId = product.id           
            const topRated = await TopRated.findOne({where: {productId}})
            
            if (topRated != null) {
                
                return res.json({message: `${productName} is already a Top Rated Product`})
            } else {
                
                await TopRated.create({productId})
                
                return res.status(200.).json({message: `new product ${productName} is now a Top Rated Product`})

            }

        }
            
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

//remove from Top Rated
const removeTopRated = async (req, res) =>{
    
    try{

        const productName = req.params.product
      
        const removeProduct = await TopRated.findOne({where: {productName}})
        
        if (removeProduct != null) {
            
            await removeProduct.destroy()
            return res.status(200).json({message: `the product ${removeProduct.productName} has been removed from Top Rated`})
            
        } else {
            
            return res.status(200).json({message: `the product to be removed from Top Rated does not exist`})
        }


    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

module.exports = {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct, getFeaturedProducts, addFeaturedProduct, removeFeaturedProduct, getPopularProducts,addPopularProduct, removePopularProduct, getBestSellers,addBestSeller,removeBestSeller, getHotDeals, addHotDeal, removeHotDeal, getTopRated, addTopRated, removeTopRated}