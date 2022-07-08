const Product = require("../../Models/Product");
const Size = require("../../Models/Size");

const addproduct = (req,res)=>{
    const {name,desc} = req.body ;
    new Product({
     name ,
     desc
    }).save((err,result)=>{
        if(err) res.status(400).json({"err":err , "msg":"A product with same name already exists"}) ;
        else res.status(200).json("Product added succesfully !!!") ; 
    })
}

const addsize = async(req,res)=>{
    const {price,size,specefication,product} = req.body ;
    new Size({
        price ,
        size ,
        specefication ,
        product
    }).save((err,result)=>{
        if(err) res.status(400).json(err) ;
        res.status(200).json("Size added succesfully !!!") ; 
    })
}

module.exports = {
    addproduct ,
    addsize
}