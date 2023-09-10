const {Products, Category, ProductType, ProductTag, Tag} = require('../sequelize/models')

// Get all Categories
const getProducts = async(req, res) => {
    try {
    
        const products = await Products.findAll()
    
        res.status(200).json(products)
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

// Get one Categories
const getOneProduct = async(req, res) => {
    try {
    
        const uuid = req.params.uuid

        const product = await Products.findOne({where: {uuid}})

        res.status(200).json(product)
    
    } catch (error) {
    
        // console.log(error);
        return res.status(404).json({message: "category not found"})
    
    }
}

//  Create Category
const createProduct = async(req, res) =>{
    
    try{

        const {productName,productThumbnail,productPrice,productDiscount,productDescription,productWeight,productColour,productStock,typeName,categoryName} = req.body;
 
        const exist = await Products.findOne({where: {productName}})
        const category = await Category.findOne({where: {categoryName}})
        const type = await ProductType.findOne({where: {typeName}})
        console.log(req.body, exist, category, type);
        
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
        return res.status(500).json({message: "ssomething went wrong"})
    
    }
} 

// Update Category
const updateProduct = async (req, res) =>{
    
    try{

        const uuid = req.params.uuid
        const {categoryName,categoryImage} = req.body;
      
        const categoryUpdate = await Category.findOne({where: {uuid}})

        
        if(categoryName){
            
            await categoryUpdate.update({categoryName})
            return res.status(200.).json({message: `category name updated to ${categoryName}`})
        }
        if(categoryImage){
            
            await categoryUpdate.update({categoryImage})
            return res.status(200.).json({message: `${categoryUpdate.categoryName} category image updated`})
        }

    } catch (error) {
    
        console.log(error);
        return res.status(404).json({message: "category to be updated does not exist"})
    
    }
} 

// Update Category
const deleteProduct = async (req, res) =>{
    
    try{

        const uuid = req.params.uuid
      
        const removeCategory = await Category.findOne({where: {uuid}})
        
        await removeCategory.destroy()

        return res.status(200.).json({message: `${removeCategory.categoryName} category deleted`})

    } catch (error) {
    
        console.log(error);
        return res.status(404).json({message: "category to be updated does not exist"})
    
    }
} 

module.exports = {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct}