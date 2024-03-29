const express = require("express");
const router = express.Router();
const Authentication = require("../Controllers/user/auth_user");
const Adoption = require("../Controllers/user/adoptions") ;
const Favourites = require("../Controllers/user/favourites") ;
const Filters = require("../Controllers/user/filter") ;
const Pdtfilter = require("../Controllers/user/productfilter") ;
const conversation = require("../Controllers/user/conversation") ;
const message = require("../Controllers/user/message") ;
const ecomm = require("../Controllers/user/ecommerce") ;
const payment = require("../Controllers/user/payment")

const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt-nodejs');

router.get('/' , (req,res)=>{
    res.json('Hi World') ;
});
//For login
router.post('/login',(req,res)=>{
    Authentication.login(req,res,bcrypt,jwt);
});
router.get('/verifytoken/:token',(req,res)=>{
    Authentication.getuser(req,res,jwt,bcrypt);
});

//For register
router.post('/register', (req,res)=>{
    Authentication.register(req,res,bcrypt,jwt);
});

//auth
router.post('/social-signup',(req,res)=>{
    Authentication.social_signup(req,res); 
})
router.post('/social-signin',(req,res)=>{
    Authentication.social_signin(req,res); 
})
router.post('/check-phone',(req,res)=>{
    Authentication.check_phone(req,res); 
})
router.post('/phoneauth',(req,res)=>{
    Authentication.phone_auth(req,res); 
})

//For adoption
router.post('/post/adoptions',(req,res)=>{
    Adoption.addadoption(req,res) ;
}) ;
router.get('/get/adoptions',(req,res)=>{
    Adoption.getpet(req,res) ;
}) ;
router.post('/add/pets',(req,res)=>{
    Adoption.addpet(req,res) ;
}) ;
router.post('/moveforadoption',(req,res)=>{
    Adoption.movepet(req,res) ;
}) ;
//For getting the email of pre users
router.post('/registeremail',(req,res)=>{
    Authentication.registeremail(req,res) ;
})
//adding favourites
router.post('/add/favourite',(req,res)=>{
    Favourites.addfavourite(req,res) ;
})
router.post('/fetch/favourite',(req,res)=>{
    Favourites.fetchfavourite(req,res) ;
})

//Conversations api
router.post("/add",(req,res)=>{
    conversation.newconversations(req,res) ;
})
router.get("/find/:userId",async(req,res)=>{
    conversation.getuserconversation(req,res) ;
}) ;
router.get("/find/:firstuserId/:seconduserId",async(req,res)=>{
    conversation.getconversationwithid(req,res) ;
}) ;


//Chats api
router.post("/add/messages",async(req,res)=>{
    message.addmessages(req,res) ;
}) ;  //add messages
router.get("/messages/:conversationId",async(req,res)=>{
    message.getmessages(req,res) ;
}) ; //get messages

//filter api
router.post("filter/breed",async(req,res)=>{
   Filters.filterbybreed(req,res) ;
}) ;
router.post("filter/location",async(req,res)=>{
    Filters.filterbylocation(req,res) ;
 }) ;
 router.post("filter/age",async(req,res)=>{
    Filters.filterbyage(req,res) ;
 }) ;
 router.post("filter/vaccine",async(req,res)=>{
    Filters.filterbyvaccine(req,res) ;
 }) ;
 router.post('/filter/all',async(req,res)=>{
     Filters.filterAll(req,res) ;
 })

 //product filters
router.post('/filter/products',(req,res)=>{
    Pdtfilter.filterproducts(req,res) ;
})

//ecommerce
router.get('/ecom/getproducts',(req,res)=>{
    ecomm.getproduct(req,res) ;
}) ;
router.post('/ecom/getproductbyid',(req,res)=>{
    ecomm.getpdtbyid(req,res) ;
}) ;
router.post('/ecom/filladdress',(req,res)=>{
    ecomm.set_address(req,res) ;
}) ;
router.post('/ecom/getaddress',(req,res)=>{
    ecomm.get_address(req,res) ;
}) ;
router.post('/ecom/addtocart',(req,res)=>{
    ecomm.add_tocart(req,res) ;
})
router.post('/ecom/viewcart',(req,res)=>{
    ecomm.view_cart2(req,res) ;
})
router.post('/ecom/quantitycheck',(req,res)=>{
    ecomm.quantity_check(req,res) ;
})
router.post('/ecom/addfavourite',(req,res)=>{
    ecomm.addfavourites(req,res) ;
})
router.post('/ecom/viewfavourite',(req,res)=>{
    ecomm.viewfavourites(req,res) ;
})
router.post('/ecom/removecart',(req,res)=>{
    ecomm.remove_cart(req,res) ;
})
router.post('/ecom/removefavourite',(req,res)=>{
    ecomm.removefavourites(req,res) ;
})
router.post('/ecom/updatecart',(req,res)=>{
    ecomm.update_quantity(req,res) ;
})
router.post('/ecom/move/favouritetocart',(req,res)=>{
    ecomm.movefromfavouritetocart(req,res) ;
})
router.post('/ecom/move/carttofavourite',(req,res)=>{
    ecomm.movefromcarttofavourites(req,res) ;
})
router.post('/ecom/placeorder',(req,res)=>{
    ecomm.addorder(req,res) ;
})
router.post('/ecom/vieworders',(req,res)=>{
    ecomm.vieworders(req,res) ;
})
router.post('/ecom/viewcancelledorders',(req,res)=>{
    ecomm.viewcancelledorders(req,res) ;
})
//payments
router.post('/pay-order',(req,res)=>{
   payment.pay_order(req,res) ;
})
router.get('/get-razorpay-key', (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
  });
router.post('/create-order', async (req, res) => {
    payment.create_order(req,res) ;
  }) ;
module.exports=router;