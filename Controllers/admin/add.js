const Breeds = require("../../Models/Breeds");
const Diseases = require("../../Models/Diseases");
const Allergies = require("../../Models/Allergies");

const addbreed = async(req,res)=>{
   const { breed } = req.body ;
    Breeds.insertMany(breed).then(
        function(){
            res.status(200).json("Breeds added succesfully") ;
        }
    ).catch((err)=>{
        res.status(400).json(err) ;
    })
}

const add_diseases = async(req,res)=>{
    const { diseases } = req.body ;
    Diseases.insertMany(diseases).then(
        function(){
            res.status(200).json("Breeds added succesfully") ;
        }
    ).catch((err)=>{
        res.status(400).json(err) ;
    })
 }

 const addallergies = async(req,res)=>{
    const { allergies } = req.body ;
    Allergies.insertMany(allergies).then(
        function(){
            res.status(200).json("Breeds added succesfully") ;
        }
    ).catch((err)=>{
        res.status(400).json(err) ;
    })
 }

module.exports = {
    addbreed ,
    add_diseases ,
    addallergies
}