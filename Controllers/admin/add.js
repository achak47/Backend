const Breed = require("../../Models/Breed");

const addbreed = async(req,res)=>{
   const { breed } = req.body ;
   const [ b ] = await Breed.find({}) ;
   breed.forEach(i=>{
    if(!b.breeds.includes(i))
       b.breeds.push(i) ;
   })
   await b.save() ;
   res.status(200).json("Breeds added succesfully") ;
}

module.exports = {
    addbreed
}