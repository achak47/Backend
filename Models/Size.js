const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
    price: Number,
    size: String ,
    specefication: String ,
    image : String ,
    product :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }
}) ;

module.exports=mongoose.model('Size',schema);