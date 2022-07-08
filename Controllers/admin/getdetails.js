const Breeds = require("../../Models/Breeds");
const Diseases = require("../../Models/Diseases");
const Allergies = require("../../Models/Allergies");

const getbreed = (req,res)=>{
   const {type} = req.query ;
   Breeds.find({type:type},(err,result)=>{
    if(err) res.status(400).json(err) ;
    res.status(200).json(result) ;
   })  
}

const get_diseases = (req,res)=>{
    const { type } = req.query ;
    Diseases.find({type: {$in: [type]}},(err,result)=>{
     if(err) res.status(400).json(err) ;
     res.status(200).json(result) ;
    })    
}

const getallergies = (req,res)=>{
    const { type } = req.query ;
    Allergies.find({type: {$in: [type]} },(err,result)=>{
     if(err) res.status(400).json(err) ;
     res.status(200).json(result) ;
    }) 
}

module.exports = {
    getbreed ,
    get_diseases ,
    getallergies
}