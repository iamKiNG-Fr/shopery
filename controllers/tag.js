const {Tag, Products, ProductTag} = require('../sequelize/models');

//get tags
const getAllTags = async (req, res) => {

    const tag = await Tag.findAll()
    return res.status(200).json({tag})
}

//add tags
const addTag = async (req,res) => {
    try {

        const {tagName} = req.body 
       
        const tag = await Tag.findOne({where: {tagName: tagName}})
        console.log(tag);
        if (tag == null) {
            
            await Tag.create({tagName})
            return res.status(200).json({message: `${tagName} Tag Added to Tags`})
            
        } else {
            
            return res.status(200).json({message: `${tagName} Tag already exists`})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    }
}

//add tag to product
const setProductTag = async (req,res) => {
    try {

        const {tagName, productName} = req.body 
       
        const tag = await Tag.findOne({where: {tagName}})
        const product = await Products.findOne({where: {productName}})
        const productTag = await ProductTag.findOne({where: {productId: product.id, tagId: tag.id}})
        
        if (tag != null && product != null ) {
            
            if (productTag == null) {
                await ProductTag.create({productId:product.id, tagId:tag.id})
                return res.status(200).json({message: `${productName} has been taged as ${tagName}`})
                
            } else {
    
                return res.status(200).json({message: `Tag ${productName} has already been tagged as ${tagName}`})
    
            }

        } else {

            if (tag == null && product == null) {
                return res.status(200).json({message: `product named ${productName}, and Tag ${tagName}, does not exists`})
            }
            else if (product == null) {
                return res.status(200).json({message: `product named ${productName}, does not exists`})
            } else {
                return res.status(200).json({message: `Tag ${tagName}, does not exists`})
            }
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    }
}

//get all tag and their products
const getTagProducts = async (req, res) => {

    const tagName = req.params.tagname
    const tag = await Tag.findOne({where:{tagName}})
    const productTag = await ProductTag.findAll({where:{tagId: tag.id}, include: [Products]})

    const productList = []

    for (let product = 0; product < productTag.length; product++) {
        const element = productTag[product].Product;
        productList.push(element)
    }

    return res.status(200).json(productList)
}

const getProductTags = async (req, res) => {

    try {
        
        const id = req.params.productid
        const product = await Tag.findOne({where:{id}})
        const productTag = await ProductTag.findAll({where:{productId: product.id}, include: [Tag]})
    
        const productList = []
    
        for (let tag = 0; tag < productTag.length; tag++) {
            const element = productTag[tag].Tag;
            productList.push(element)
        }
    
        return res.status(200).json(productList)

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({message: "something went wrong" })

    }

}


module.exports = {getAllTags, addTag, setProductTag, getTagProducts, getProductTags}
