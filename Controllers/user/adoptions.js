const Adoptions = require("../../Models/Adoptions");
const addpet = (req,res)=>{
  const {name,type,gender,age,colour,breed,primary_breed,allergies,diseases,disabilities,location,picture,user_id} = req.body ;
  //if(!name || !desc || !location || !picture || !user_id) res.status(400).json("Invalid Credentials") ;
  new Adoptions({
    name,
    type,
    gender,
    age,
    colour,
    breed,
    primary_breed,
    allergies,
    diseases,
    disabilities,
    location,
    picture,
    user:user_id 
  }).save((err,result)=>{
    if(err) res.status(400).json(err) ;
    res.status(200).json("Your request for adoption posted succesfully !!!") ;
      }) ;
}
function modifypets(pets){
  pets.forEach(r=>{
    let desc = r.name+(r.name?" a ":" A ")+r.age+" years old "+r.color+" "+r.breed+" in "+r.location ;
    r.desc = desc ;
    const start_time = r.timestamp,end_time = Date.now() ;

const total = new Date(end_time).getTime() -  new Date(start_time).getTime();
var days = ((Math.floor((total)/1000))/3600)/24;
var months = days/30 ;
const year = months/12 ;
months %= 12 ;
r.year = year ;
r.months = months ;
 console.log(desc) ;
  })    ;
  return pets ;
}
const getpet = (req,res)=>{
    Adoptions.find({}).populate({path:'user',select:'name'}).then((result)=>{
      res.status(200).json(result) ;
   }).catch((err)=>{
    res.status(400).json(err) ;
   }) ;
   /*
    Adoptions.find({},(err,result)=>{
        result.forEach(r=>{
           r.populate({path:'user',select:'name'}) ;
           let desc = r.name+" a "+r.age+" years old "+r.color+" "+r.breed+" in "+r.location ;
           r.desc = desc ;
           const date = r.createdAt ;
           console.log(r) ;
        }) ;
        res.status(200).json(result) ;
    }) */
    //var retpets = await modifypets(pets) ;
}

module.exports = {
    addpet,
    getpet
}