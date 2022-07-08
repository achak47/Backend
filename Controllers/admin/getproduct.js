const Product = require("../../Models/Product");
const Size = require("../../Models/Size");

const getproducts = async(req,res)=>{
  const products = await Product.find({}) ;
  res.status(200).json(products) ;
}

const getsizebyproduct = async(req,res)=>{
    const {product} = req.body ;
    const pdt = await Product.findOne({name:product}) ;
    const sizes = await Size.find({product:pdt._id}) ;
}

module.exports = {
    getproducts ,
    getsizebyproduct 
}