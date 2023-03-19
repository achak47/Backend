const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
    price: Number,
    size: String ,
    tags: String ,
    image : [String] ,
    weight:Number,
    mrp:Number,
    quantity:Number ,
    product :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }
}) ;

module.exports=mongoose.model('Size',schema);