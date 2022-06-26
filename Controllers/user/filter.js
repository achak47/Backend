const adoptions = require("../../Models/Adoptions") ;

const filterbybreed = (req,res)=>{
  adoptions.find({},(err,result)=>{
    result.filter(r=>r.breed==req.body.breed) ;
    res.status(200).json(result) ;
  })
}
const filterbylocation = (req,res)=>{
    adoptions.find({},(err,result)=>{
      result.filter(r=>r.location==req.body.location) ;
      res.status(200).json(result) ;
    })
  }
const filterbyage = (req,res)=>{
    adoptions.find({},(err,result)=>{
        result.filter(r=>r.age>req.body.minage && r.age<req.body.maxage) ;
        res.status(200).json(result) ;
      }) ;
}
const filterbyvaccine = (req,res)=>{
    adoptions.find({},(err,result)=>{
        result.filter(r=>r.isVaccinated ==true) ;
        return result ;
      }) 
}
const filterAll = (req,res)=>{
  const { breed,location,vaccine } = req.body ;
  adoptions.find({},(err,result)=>{
    result.filter(r=> breed.includes(r.breed)) ;
    if(vaccine) result.filter(r=>r.isVaccinated ==true) ;
    console.log(result) ;
    return res.status(200).json(result.filter(r=> breed.includes(r.breed) && (vaccine?r.isVaccinated==true:r.isVaccinated==false)
    && (location==""?r.location.length>0:r.location == location ))) ;
  })
}
module.exports = {
    filterbybreed ,
    filterbylocation ,
    filterbyage,
    filterbyvaccine,
    filterAll
}