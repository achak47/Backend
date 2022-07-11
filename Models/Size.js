const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
    price: Number,
    size: String ,
    specefication: String ,
    image : String
}) ;

module.exports=mongoose.model('Size',schema);