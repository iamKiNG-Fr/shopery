const {Products, Category, ProductType, FeaturedProducts,ProductTag, Tag} = require('../sequelize/models')
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

            return res.status(200).json(featuredProducts)
            
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
      
        const removeProduct = await FeaturedProducts.findOne({where: {productName}})
        
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

module.exports = {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct, getFeaturedProducts, addFeaturedProduct, removeFeaturedProduct}