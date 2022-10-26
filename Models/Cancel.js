const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
  size:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Size'
  } ,
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Products'
  } ,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
  } ,
  order:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Orders'
  },
  reason : String
},{
  timestamps:true
})

module.exports = mongoose.model('Cancelled',schema) ;