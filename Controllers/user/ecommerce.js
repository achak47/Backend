const Product = require("../../Models/Product");
const Size = require("../../Models/Size");
const Address = require("../../Models/Address");
const User = require("../../Models/User");

const getproduct = (req,res)=>{
  Product.find({}).populate({path:'sizes'}).then((result)=>{
    res.status(200).json(result) ;
 }).catch((err)=>{
  res.status(400).json(err) ;
 }) ;
}
const get_address = async(req,res) =>{
    const {city,pin,house_no,apartment,landmark,street,area,user} = req.body ;
    const users = await User.findById({id:user}) ;
    new Address({
     city,
     pin,
     house_no,
     apartment,
     landmark,
     street,
     area,
     user
    }).save((err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            res.status(200).json("Address added succesfully !!!") ;
            users.address.push(result._id) ;
        } 
    })
}
const quantity_check = (req,res)=>{
   const {item,quantity} = req.body ;
   Size.findById({id:item},(err,result)=>{
    if(result.quantity<quantity) res.status(200).json("Insufficient Quantity") ;
    else{
          return ;
    }
   })
}

const add_tocart = (req,res)=>{
    const {user,item} = req.body ;
    User.findByIdAndUpdate({user}, {$push: {cart: item}},
        (err,result)=>{
            if(err) res.status(200).json(err) ;
            else res.status(200).json("Item Added to your favourites") ;
        })
}

const view_cart = async(req,res)=>{
    const {cart} = req.body ;
    let pdts = await Size.find({}) ;
    pdts = pdts.filter(item => item._id in cart) ;
    return res.status(200).json(pdts) ;
}

const remove_cart = (req,res)=>{
    const {user,item} = req.body ;
     User.findByIdAndUpdate({user},{$pop:{cart:item}},
        (err,result)=>{
            if(err) res.status(200).json(err) ;
            else res.status(200).json("Item Removed from your cart") ;
        })
}

const addfavourites = (req,res)=>{
    const {user,item} = req.body ;
    User.findByIdAndUpdate({user}, {$push: {favourites: item}},
        (err,result)=>{
            if(err) res.status(200).json(err) ;
            else res.status(200).json("Item Added to your favourites") ;
        }) 
}
const viewfavourites = async(req,res)=>{
    const {favourites} = req.body ;
    let pdts = await Size.find({}) ;
    pdts = pdts.filter(item => item._id in favourites) ;
    return res.status(200).json(pdts) ;  
}
const removefavourites = async(req,res)=>{
    const {user,item} = req.body ;
     User.findByIdAndUpdate({user},{$pop:{favourites:item}},
        (err,result)=>{
            if(err) res.status(200).json(err) ;
            else res.status(200).json("Item Removed from your favourites") ;
        })
}

const movefromfavouritetocart = (req,res)=>{
    const {user,item} = req.body ;
    User.findByIdAndUpdate({user},{$pop:{favourites:item},$push: {cart: item}},
        (err,result)=>{
            if(err) res.status(200).json(err) ;
            else res.status(200).json("Item moved from favourites to cart") ;
        }) 
}
const movefromcarttofavourites = (req,res)=>{
    const {user,item} = req.body ;
    User.findByIdAndUpdate({user},{$pop:{favourites:item},$push: {cart: item}},
        (err,result)=>{
            if(err) res.status(200).json(err) ;
            else res.status(200).json("Item moved from cart to favourites") ;
        }) ;
}
module.exports = {
    getproduct ,
    get_address ,
    add_tocart ,
    view_cart ,
    quantity_check ,
    addfavourites ,
    viewfavourites ,
    removefavourites ,
    remove_cart ,
    movefromfavouritetocart,
    movefromcarttofavourites
}