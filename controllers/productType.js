const {ProductType} = require('../sequelize/models')

// Get all ProductTypes
const getProductTypes = async(req, res) => {
    try {
    
        const productTypes = await ProductType.findAll()
    
        res.status(200).json(productTypes)
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

// Get one ProductType
const getOneProductType = async(req, res) => {
    try {
    
        const uuid = req.params.uuid

        const productType = await ProductType.findOne({where: {uuid}})

        res.status(200).json(productType)
    
    } catch (error) {
    
        // console.log(error);
        return res.status(404).json({message: "ProductType not found"})
    
    }
}

//  Create ProductType
const createProductType = async(req, res) =>{
    
    try{

        const {typeName} = req.body;
 
        const exist = await ProductType.findOne({where: {typeName}})
        
        if(!exist){
            
            await ProductType.create({typeName})
            return res.status(200.).json({message: `new ProductType ${typeName} created`})
            
        } else{

            return res.json({message: `ProductType: ${typeName}, aleady exist`})

        }
            
    
    } catch (error) {
    
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
} 

// Update ProductType
const updateProductType = async (req, res) =>{
    
    try{

        const uuid = req.params.uuid
        const {typeName} = req.body;
      
        const typeUpdate = await ProductType.findOne({where: {uuid}})

        
        if(typeUpdate){
            
            await typeUpdate.update({typeName})
            return res.status(200.).json({message: `ProductType name updated to ${typeName}`})
        }

    } catch (error) {
    
        console.log(error);
        return res.status(404).json({message: "ProductType to be updated does not exist"})
    
    }
} 

// Update ProductType
const deleteProductType = async (req, res) =>{
    
    try{

        const uuid = req.params.uuid
      
        const removeProductType = await ProductType.findOne({where: {uuid}})
        
        await removeProductType.destroy()

        return res.status(200.).json({message: `${removeProductType.typeName} ProductType deleted`})

    } catch (error) {
    
        console.log(error);
        return res.status(404).json({message: "ProductType to be updated does not exist"})
    
    }
} 

module.exports = {getProductTypes, getOneProductType, createProductType, updateProductType, deleteProductType}