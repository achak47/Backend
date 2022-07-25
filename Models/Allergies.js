const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
   name:{
     type:String 
   },
   desc:{
     type:String 
   },
   type:{
    type:String
   }
}) ;

module.exports = mongoose.model('Allergies',schema) ;