const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
    price: String,
    size: String ,
    specefication: String ,
    product :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }
}) ;

module.exports=mongoose.model('Size',schema);