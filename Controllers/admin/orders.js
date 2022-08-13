const Orders = require("../../Models/Orders");

const addorder = (req,res)=>{
    const {user,product,amount,quantity,status} = req.body ;
    new Orders({
        user,
        product,
        amount,
        quantity,
        status
    }).save((err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            res.status(200).json("Order Placed Succesfully !!!") ;
        }
    })
}

const getorders = async(req,res)=>{
    let orders = await Orders.find({})
    .populate({path:'user',select:'email phone'})
    .populate({path:'product.product',select:'price product quantity'}) ;
    /* Testing without adding address at first 
    orders = orders.map(o =>{
        o.product = o.product.map(p=> p.populate({path:'product'}))
    }) */
    res.status(200).json(orders) ;
}

const shiporder = async(req,res)=>{
    const {order} = req.body ;
    const o = await Orders.findById({id:order}) 
    o.status = "Shipped" ;
    o.save((err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            res.status(200).json("Order Shipped Succesfully !!!") ;
        }   
    })
}

const getorderlist = async(req,res)=>{
    let orders = await Orders.find({})
    .populate({path:'user',select:'email phone'})
    .populate({path:'product.product',select:'price product quantity'}) ;
    const orderlist = orders.map(o=>{
     const sublist = o.product.map(p=>{
        p['status'] = o.status ;
        p['email'] = o.user.email ;
        p['user_id'] = o.user._id ;
        p['isPaid'] = o.isPaid ;
        p['createdAt'] = o.createdAt ;
        p['_id'] = o._id ;
        p['totalamount'] = o.amount ;
        p['orderId'] = o.razorpay.orderId ;
        p['paymentId'] = o.razorpay.paymentId ;
        p['signature'] = o.razorpay.signature ;
        return {
        'status' :  o.status ,
        'email': o.user.email ,
        'user_id': o.user._id ,
        'isPaid': o.isPaid ,
        'createdAt': o.createdAt ,
        '_id': o._id ,
        'totalamount': o.amount ,
        'orderId': o.razorpay.orderId ,
        'paymentId': o.razorpay.paymentId ,
        'signature': o.razorpay.signature ,
        'size_id':p.product._id,
        'product_id':p.product.product,
        'price':p.product.price,
        'quantity':p.product.quantity
        } ;
     })
     return sublist ;
    })

    res.status(200).json(orderlist.flat()) ;
}

module.exports = {
    addorder ,
    getorders ,
    shiporder,
    getorderlist
}