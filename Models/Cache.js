const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
   name:{
     type:String
   },
   values:[{ type: String, unique: true }]
}) ;

module.exports = mongoose.model('Cache',schema) ;