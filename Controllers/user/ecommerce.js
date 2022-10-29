const Product = require("../../Models/Product");
const Size = require("../../Models/Size");
const Address = require("../../Models/Address");
const User = require("../../Models/User");
const Orders = require("../../Models/Orders");
const Cancel = require("../../Models/Cancel");

const getproduct = (req,res)=>{
  Product.find({}).populate({path:'sizes'}).then((result)=>{
    res.status(200).json(result) ;
 }).catch((err)=>{
  res.status(400).json(err) ;
 }) ;
}
const getpdtbyid = async(req,res)=>{
    const {id} = req.body ;
    const pdt = await Product.findById(id).populate({path:'sizes'}) ;
    res.status(200).json(pdt) ;
}
const set_address = async(req,res) =>{
    const {city,pin,line1,line2,user,landmark} = req.body ;
    const users = await User.findById(user) ;
    new Address({
        city,
        pin,
        line1,
        line2,
        landmark,
        phone : users.phone ,
        user
    }).save(async(err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            users.address.push(result._id) ;
            await users.save() ;
            res.status(200).json("Address added succesfully !!!") ;
        } 
    })
}
const get_address = async(req,res) =>{
    const {user} = req.body ;
    const a = await User.findById(user).populate({path:'address'}) ;
    res.status(200).json(a.address) ;
}
const quantity_check = async(req,res)=>{
   const {item,quantity} = req.body ;
   const result = await Size.findById(item)
    if(result.quantity<quantity) res.status(200).json("Insufficient Quantity") ;
    else{
          return res.status(200).json("OK") ; 
    }
}

const add_tocart = async(req,res)=>{
    const {user,item,quantity} = req.body ;
    const users = await User.findByIdAndUpdate(user) ;
    users.cart.push({item,quantity}) ;
    await users.save() ;
    res.status(200).json("Item Added to your favourites") ;
}

const view_cart = async(req,res)=>{
    const {cart} = req.body ;
    let pdts = await Size.find({ '_id': { $in: cart } }).populate({path:'product',select:'name image flavours'}) ;
    return res.status(200).json(pdts) ;
}

const view_cart2 = async(req,res)=>{
    const {user} = req.body ;
    let pdts = await User.findById(user)
    .populate({path:'cart.item',populate:[{path:'product',select:'name image flavours'}]})
    return res.status(200).json(pdts.cart) ;
}

const remove_cart = async(req,res)=>{
    const {user,item} = req.body ;
    let u = await User.findById(user) ;
    u.cart.filter(id=> id != item) ;
    await u.save() ;
    res.status(200).json("Item Removed from your cart") ;
}

const update_quantity = async(req,res)=>{
    const {user,item,quantity} = req.body ;
    let u = await User.findById(user) ;
    u.cart.forEach(e => {
        if(e.item == item) e.quantity = quantity ;
    });
    await u.save() ;
    res.status(200).json("Quantity upgraded") ;
}
const addfavourites = async(req,res)=>{
    const {user,item} = req.body ;
    let u = await User.findById(user) ;
    u.favourites.push(item) ;
    res.status(200).json("Item Added to your favourites") ;
}
const viewfavourites = async(req,res)=>{
    const {favourites} = req.body ;
    let pdts = await Size.find({ '_id': { $in: favourites } }) ; ;
    return res.status(200).json(pdts) ;  
}
const removefavourites = async(req,res)=>{
    const {user,item} = req.body ;
    let u = await User.findById(user) ;
    u.favourites.filter(id=> id != item) ;
    await u.save() ;
    res.status(200).json("Item Removed from your favourites") ;
}

const movefromfavouritetocart = async(req,res)=>{
    const {user,item} = req.body ;
    let u = await User.findById(user) ;
    u.favourites.filter(id=> id != item) ;
    await u.save() ;
    res.status(200).json("Item moved from favourites to cart") ;
    
}
const movefromcarttofavourites = (req,res)=>{
    const {user,item} = req.body ;
    User.findByIdAndUpdate({user},{$pop:{favourites:item},$push: {cart: item}},
        (err,result)=>{
            if(err) res.status(200).json(err) ;
            else res.status(200).json("Item moved from cart to favourites") ;
        }) ;
}

const addorder = (req,res)=>{
    const {user,product,amount,quantity,status,isPaid,address} = req.body ;
    new Orders({
        user,
        product,
        amount,
        quantity,
        status,
        isPaid,
        address
    }).save((err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            res.status(200).json("Order Placed Succesfully !!!") ;
        }
    })
}
const cancel_order  = async (req,res)=>{
    const {user,product,size,order_id,reason} = req.body ;
    //const u = await User.findById({_id:pet}) ;
    const o = await Orders.findById({_id:order_id}) ;
    const c = await Cancel.find({
     user:user ,
     product:product ,
     size : size ,
     reason : reason ,
     order : order_id
    })
    if(c.length() == 0) res.status(200).json("Cancel request already placed , will be reviewed soon by us") ;
    /*
    o.product.forEach(p=>{
        if(p.product == size && p.status == "Delivered") res.status(200).json("Product already delivered !!!") ;
    }) */
    new Cancel({
        size:size,
        product:product,
        user:user
    }).save(async(err,result)=>{
        if(err) res.status(400).json(err) ;
        else{
            res.status(200).json("Placed Request for Cancellation Succesfully") ;
        } 
    })

}

const vieworders = async(req,res)=>{
    const {orders} = req.body ;
    const o = await Orders.find({ '_id': { $in: orders } }) ;
    res.status(200).json(o) ;
}
const viewcancelledorders = async(req,res)=>{
    const {orders} = req.body ;
    const o = await Orders.find({ '_id': { $in: orders } }) ;
    res.status(200).json(o) ;
}

module.exports = {
    getproduct ,
    set_address ,
    add_tocart ,
    view_cart ,
    view_cart2 ,
    quantity_check ,
    addfavourites ,
    viewfavourites ,
    removefavourites ,
    remove_cart ,
    movefromfavouritetocart,
    movefromcarttofavourites,
    cancel_order,
    getpdtbyid ,
    vieworders ,
    viewcancelledorders ,
    update_quantity,
    get_address ,
    addorder
}