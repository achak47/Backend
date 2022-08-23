const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
  product:[{product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Size' 
  },
  quantity: Number,
  status: String
 }],
  amount:Number ,
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
} ,
address : {
  type:mongoose.Schema.Types.ObjectId,
  ref:'Address'
},
isPaid: Boolean ,
razorpay: {
  orderId: String ,
  paymentId: String ,
  signature: String 
},
date:String
},{
  timestamps:true
})

module.exports = mongoose.model('Orders',schema) ;