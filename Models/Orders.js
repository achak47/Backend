const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
  product:[{product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Size' 
  },
  quantity: Number
 }],
  amount:Number ,
  status:String ,
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
} ,
isPaid: Boolean ,
razorpay: {
  orderId: String ,
  paymentId: String ,
  signature: String 
}
},{
  timestamps:true
})

module.exports = mongoose.model('Orders',schema) ;