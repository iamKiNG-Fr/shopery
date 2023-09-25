const {ads} = require('../sequelize/models');
const products = require('../sequelize/models/products');

//get all the ads
const getAllAds = async (req,res) => {
    try {

        const allAds = await ads.findAll()
        
        if (ads != null) {
            
            return res.status(200).json(allAds)
            
        } else {
            
            return res.status(200).json({message: "No Ads"})
        }

    } catch (error) {
        return res.status(500).json({message: "something went wrong"})
    }
}

//get only one ad
const getOneAd = async (req,res) => {
    try {
        
        const id = req.params.id
        const oneAd = await ads.findOne({where: {id}})
        
        if (oneAd != null) {
            
            return res.status(200).json(oneAd)
            
        } else {
            
            return res.status(200).json({message: "Ad not found"})
        }

    } catch (error) {
        return res.status(500).json({message: "something went wrong"})
    }
}

//add an ad
const addAd = async (req,res) => {
    try {

        const {title, description, offer, link, image, validFrom, validTo} = req.body
        
        await ads.create({title, description, offer, link, image, validFrom, validTo})
        return res.status(200).json({message: `new Ad ${title} created`})
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({message: "something went wrong"})
    
    }
}

//delete an ad
const removeAd = async (req,res) => {
    try {
        const id = req.params.id
        const oneAd = await ads.findOne({where: {id}})

        if (oneAd != null) {
        
            await oneAd.destroy()
            return res.status(200).json({message: `${oneAd.title} Ad deleted`}) 
            
        } else {
            
            return res.status(200).json({message: "Incorrect Ad Id, Ad does not exist"}) 

        }
    
    } catch (error) {
        return res.status(500).json({message: "something went wrong"})
    }
}

const updateAd = async (req,res) => {
    try {

        const id = req.params.id

        const exist = await ads.findOne({where: {id}})
        
        
        if(exist != null){
          
            await ads.update(req.body, {where: {id}})
            return res.status(200).json({message: `${exist.title} Ad successfully updated`})
       
        } else {
        
            return res.status(200).json({message: `incorrect Ad ID, Ad to be updated does not exist`})
        }
        
    } catch (error) {
        return res.status(500).json({message: "something went wrong"})
    }
}

module.exports = {getAllAds, getOneAd, addAd, removeAd, updateAd}