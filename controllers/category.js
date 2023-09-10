const {Category, Products} = require('../sequelize/models');
const products = require('../sequelize/models/products');

// Get all Categories
const getCategories = async(req, res) => {
    try {
    
        const categories = await Category.findAll()
    
        res.status(200).json(categories)
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

// Get one Categories
const getOneCategory = async(req, res) => {
    try {
    
        const uuid = req.params.uuid

        const category = await Category.findOne({where: {uuid}})

        res.status(200).json(category)
    
    } catch (error) {
    
        // console.log(error);
        return res.status(404).json({message: "category not found"})
    
    }
}

// Get All Products in a category
const getCategoryProducts = async(req, res) => {
    try {
        
        const categoryName = req.params.category

        const category = await Category.findOne({where: {categoryName}})

        if (category != null) {
            
            const categoryProducts = await Products.findAll({where: {categoryId: category.id }})
            
            return res.status(200).json(categoryProducts)
        }
        else {
            
            return res.json({message: "invalid category"})

        }
    
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}



//  Create Category
const createCategory = async(req, res) =>{
    
    try{

        const {categoryName,categoryImage} = req.body;
 
        const exist = await Category.findOne({where: {categoryName}})
        
        if(!exist){
            
            await Category.create({categoryName, categoryImage})
            return res.status(200.).json({message: `new category ${categoryName} created`})
            
        } else{

            return res.json({message: `category: ${categoryName}, aleady exist`})

        }
            
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

// Update Category
const updateCategory = async (req, res) =>{
    
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
const deleteCategory = async (req, res) =>{
    
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

module.exports = {getCategories, getOneCategory, getCategoryProducts, createCategory, updateCategory, deleteCategory}