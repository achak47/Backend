const Product = require("../../Models/Product");
const Size = require("../../Models/Size");

const filterproducts = (req,res)=>{
  const {price,rating,newest} = req.body ;
  Product.find({rating : {$gte : rating}}).populate({path:'sizes'}).then((result)=>{
        res.status(200).json(
            newest?result.map((r) => {
                r.sizes = r.sizes.filter(s=>s.price<=price)
                return r 
            }).reverse()
            :result.map((r) => {
                r.sizes = r.sizes.filter(s=>s.price<=price)
                return r 
            })
            ) ;
     }).catch((err)=>{
      res.status(400).json(err) ;
     }) ;
}

module.exports = {
    filterproducts
}