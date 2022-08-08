const mongoose = require('mongoose') ;
const schema = ({
  product:[{product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Size' 
  },
  quantity: Number
 }],
  amount:Number ,
  quantity: Number ,
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
  timestamp:true
})

module.exports = mongoose.model('Orders',schema) ;