const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
   name:{
     type:String 
   },
   desc:{
     type:String 
   },
    type:String
}) ;

module.exports = mongoose.model('Diseases',schema) ;