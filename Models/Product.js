const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
    name: {
        type:String ,
        unique:true
    },
    desc: String 
}) ;

module.exports=mongoose.model('Products',schema);