const Users = require("../../Models/User") ;
//const Adoptions = require("../../Models/Adoptions") ;

const addfavourite = async(req,res)=>{
    try{
    const { userid,petid } = req.body ;
    const user = await Users.findById(userid) ;
    user.favourites.push(petid) ;
    await user.save() ;
    res.status(200).json("Success") ;
    } catch (error) {
        res.status(500).json({msg:"Failed to add your favourite",error});
    }

}

const fetchfavourite = async(req,res)=>{
  try{
    const { userid } = req.body ;
    Users.findById(userid).populate({path:'favourites'}).exec((err,users)=>{
        if(err)
        return res.status(400).json(err);
        res.status(200).json(users.favourites) ;
    }) ;
  } catch(error){
    res.status(500).json({msg:"Failed to load your favourites",error});
  }
}
module.exports = {
    addfavourite ,
    fetchfavourite
}