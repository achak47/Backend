const Product = require("../../Models/Product");
const Size = require("../../Models/Size");

const getproducts = async(req,res)=>{
  const products = await Product.find({}) ;
  res.status(200).json(products) ;
}

const getsizebyproduct = async(req,res)=>{
    const {product} = req.params ;
    const pdt = await Product.findOne({name:product}).populate({path:'sizes'}) ;
    res.status(200).json(pdt.sizes)
}

const getsizes = async(req,res)=>{
    const sizes = await Size.find({}).populate({path:'product',select:'name _id'})
    let updated = sizes.map((ob)=>{
      let result = {};
 
    // loop through the object "ob"
    result['price'] = ob.price ;
    result['size'] = ob.size ;
    result['specefication'] = ob.specefication ;
    result['image'] = ob.image ;
    result['quantity'] = ob.quantity ;
    result['product'] = ob.product.name ;
    return result;
    }) ;
    res.status(200).json(updated)
}

const getproductname = async(req,res)=>{
  const {product} = req.body ;
  const pdt = await Product.findById(product) ;
  res.status(200).json(pdt.name) ;
} 
module.exports = {
    getproducts ,
    getsizebyproduct ,
    getsizes ,
    getproductname
}