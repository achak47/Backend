const Orders = require("../../Models/Orders");
const Product = require("../../Models/Product");
const nodemailer = require('nodemailer');
const Size = require("../../Models/Size")
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
    .populate({path:'product.product',select:'_id price quantity size',populate:{path:'product',select:'name _id'}})
    .populate({path:"address"}) ;
    /* 
    orders = orders.map(o =>{
        o.product = o.product.map(p=> p.populate({path:'product'}))
    }) */
    res.status(200).json(orders) ;
}

const shiporder = async(req,res)=>{
    const {orders,orderid,names,email,date} = req.body ;
    const o = await Orders.findById(orderid)
    console.log(orders,orderid,names,email,date) ;
    o.date = date ;
    o.product.forEach(async(p)=>{
        if(orders.includes(p.product.toString())){
            console.log(p.product.toString(),orders[0])
            p.status = "Shipped"
            await Size.updateOne({_id :p.product },{$inc: {quantity: -1*p.quantity}})
        }
    }) 
    o.save((err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            //await Size.updateMany({_id :{ $in: orders } },{$inc: {quantity: -1*}}, {multi: true})
            let transporter = nodemailer.createTransport({
                host: "smtp.yandex.ru",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: 'admin@flirtaid.social', // generated ethereal user
                  pass: 'Bekarapp@123', // generated ethereal password
                },
                tls:{rejectUnauthorized:false}
              });
                let mailOptions = {
                    from : 'admin@flirtaid.social',
                    to:email,
                    subject: "Product dispatched",
                    text : "This is in response to your order ",
                    html : `
                    <h2>Your order has been dispatched</h2>
                    <p>
                    Your order(s) ${names.map(n=> n.size+" "+n.name)} is dispatched and will be shipped to you by ${date}
                    </p>
                    `
                  }
                  let info = transporter.sendMail (mailOptions, (error, info) => {
                    if(error) {
                      console.log (error);
                      res.status(500).json ({yo : 'error'});
                    }else {
                      console.log ('Message sent : ' + info.response);
                      res.status(200).json("Order Shipped Succesfully !!!") ;
                    };
                    return res.end();
                })
        }   
    }) 
    /*
    await o.save() ;
    res.status(200).json("Shipped Succesfully")
    */
}

const getorderlist = async(req,res)=>{
    let orders = await Orders.find({})
    .populate({path:'user',select:'email phone'})
    .populate({path:'product.product',select:'price product quantity'}) ;
    const orderlist = orders.map(o=>{
     const sublist = o.product.map(p=>{
        return {
        'status' :  o.status ,
        'email': o.user.email ,
        'user_id': o.user._id ,
        'isPaid': o.isPaid ,
        'created_At': o.createdAt ,
        '_id': o._id ,
        'totalamount': o.amount ,
        'orderId': o.razorpay.orderId ,
        'paymentId': o.razorpay.paymentId ,
        'signature': o.razorpay.signature ,
        'size_id':p.product._id,
        'product_id':p.product.product,
        'price':p.product.price,
        'quantity':p.product.quantity,
        'date':o.date?o.date:""
        } ;
     })
     return sublist ;
    })

    res.status(200).json(orderlist.flat()) ;
}

const getproduct = async(req,res)=>{
    const pdt = await Product.find({}).populate({path:'sizes',select:'_id size price'})
    const products = pdt.map(p=>{
       
        const sizes = p.sizes.map(m=>{
          return "{ id: "+m._id+" , size: "+m.size+" , price:"+m.price+" }"
        })
        return {
        "_id": p._id,
        "name": p.name,
        "brand": p.brand,
        "animal_type": p.animal_type.toString(),
        "foodform": p.foodform,
        "specialneeds": p.specialneeds,
        "lifestage": p.lifestage.toString(),
        "breedsize": p.breedsize.toString(),
        "flavours": p.flavours,
        "desc": p.desc,
        "image": p.image,
        "rating": p.rating.$numberDecimal,
        "details": p.details.toString(),
        "sizes": sizes.toString(),
        "createdAt": p.createdAt
        } ;
    }) 
    res.status(200).json(products) ;
  }
module.exports = {
    addorder ,
    getorders ,
    shiporder,
    getorderlist ,
    getproduct ,
    shiporder
}