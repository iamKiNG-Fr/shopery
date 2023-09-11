const {Products, Category, ProductType, ProductTag, Tag} = require('../sequelize/models')

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
        
        console.log("<<<<<<here1hmm>>>>>>");
        const exist = await Products.findOne({where: {productName}})
        console.log("<<<<<<heree>>>>>>");
        const category = await Category.findOne({where: {categoryName}})
        console.log("<<<<<<herec>>>>>>");
        const type = await ProductType.findOne({where: {typeName}})
        console.log("<<<<<<heret>>>>>>");
        // console.log(req.body, exist, categoryName, type);
        
        if(exist != null){
            
            console.log("<<<<<<hereexis>>>>>>");
            return res.json({message: `Product: ${productName}, aleady exist`})    
        } 
        if(category == null){
            
            console.log("<<<<<<herecate1>>>>>>");
            return res.json({message: `category: ${categoryName}, does not exist, create category`})    
        } 
        if(type == null){
            console.log("<<<<<<here1type>>>>>>");
            
            return res.json({message: `Type: ${typeName}, does not exist`})    
        } 
        else{
            console.log("<<<<<<here1>>>>>>");
            const categoryId = category.id
            const typeId = type.id
            console.log("<<<<<<here2>>>>>>");
            
            await Products.create({productName,productThumbnail,productPrice,productDiscount,productDescription,productWeight,productColour,productStock,typeId,categoryId})
            console.log("<<<<<<here3>>>>>>");
            return res.status(200.).json({message: `new product ${productName} added`})

        }
            
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
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