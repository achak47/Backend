const Orders = require("../../Models/Orders");

const addorder = (req,res)=>{
    const {user,product,amount,quantity,status} = req.body ;
    new Orders({
        user,
        product,
        amount,
        quantity,
        status
    }).save((err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            res.status(200).json("Order Placed Succesfully !!!") ;
        }
    })
}

const getorders = async(req,res)=>{
    const user = await Orders.find({})
    .populate({path:'user',select:'email phone address'})
    .populate({path:'address'}) ;
     res.status(200).json(user) ;
}

const shiporder = async(req,res)=>{
    const {order} = req.body ;
    const o = await Orders.findById({id:order}) 
    o.status = "Shipped" ;
    o.save((err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            res.status(200).json("Order Shipped Succesfully !!!") ;
        }   
    })
}

module.exports = {
    addorder ,
    getorders ,
    shiporder
}