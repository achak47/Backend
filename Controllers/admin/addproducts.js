const Product = require("../../Models/Product");
const Size = require("../../Models/Size");

const addproduct = (req,res)=>{
    const {name,desc,brand,ingredients,image,analysis,rating,animal_type,foodform,breedsize,specialneeds,lifestage,flavours,details} = req.body ;
    new Product({
     name ,
     desc , 
     brand ,
     ingredients ,
     analysis ,
     rating ,
     animal_type,
     foodform,
     specialneeds,
     breedsize,
     lifestage,
     flavours,
     details,
     image
    }).save((err,result)=>{
        if(err) res.status(400).json({"err":err , "msg":"A product with same name already exists"}) ;
        else res.status(200).json("Product added succesfully !!!") ; 
    })
}

const addsize = async(req,res)=>{
    const {price,size,specefication,product,image} = req.body ;
    const pdt = await Product.findOne({name:product}) ;
    new Size({
        price ,
        size ,
        specefication ,
        image
    }).save((err,result)=>{
        //if(err) res.status(400).json(err) ;
        pdt.sizes.push(result._id) ;
        pdt.save((err,result)=>{
            res.status(200).json("Size of Product added succesfully") ;
        })
    })
}

module.exports = {
    addproduct ,
    addsize
}