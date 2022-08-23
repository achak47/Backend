const Razorpay = require('razorpay');
const Orders = require("../../Models/Orders");

const get_key = (req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_KEY_ID}) ;
}

const create_order = async(req,res)=>{
  try{
  const instance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID ,
    key_secret : process.env.RAZORPAY_SECRET
  });
  const options = {
    amount: req.body.amount ,
    currency: 'INR'
  };
  const order = await instance.orders.create(options) ;
  if(!order) return res.status(400).json("Some Error Occured in the payment , pls try again after some time") ;
  res.status(200).json(order) ;
 }
 catch(error){
    res.status(400).json(error) ;
}
}

const pay_order = async(req,res)=>{
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature,product,user,address } = req.body;
    const newOrder = new Orders({
      user,
      product,
      amount,
      address,
      status:"Pending",
      isPaid:true ,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      }
  })
    await newOrder.save();
    res.send({
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {
    get_key ,
    create_order ,
    pay_order
}