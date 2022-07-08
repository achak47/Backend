const Breeds = require("../../Models/Breeds");
const Diseases = require("../../Models/Diseases");
const Allergies = require("../../Models/Allergies");

const deletebreed = (req,res)=>{
   const {name,type} = req.body ; 
   Breeds.find({name:name,type:type}).remove((err,result)=>{
    if(err) res.status(400).json(err) ;
    res.status(200).json("Breed removed succesfully !") ;
   })
}

const deletedisease = (req,res)=>{
    const {name,type} = req.body ; 
    Diseases.find({name:name,type:{$in: [type]}}).remove((err,result)=>{
     if(err) res.status(400).json(err) ;
     res.status(200).json("Breed removed succesfully !") ;
    })
 }

 const deleteallergy = (req,res)=>{
    const {name,type} = req.body ; 
    Allergies.find({name:name,type:{$in: [type]}}).remove((err,result)=>{
     if(err) res.status(400).json(err) ;
     res.status(200).json("Breed removed succesfully !") ;
    })
 }

module.exports = {
    deletebreed ,
    deletedisease ,
    deleteallergy
}