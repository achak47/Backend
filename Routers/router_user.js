const express = require("express");
const router = express.Router();
const Authentication = require("../Controllers/user/auth_user");
const Adoption = require("../Controllers/user/adoptions") ;
const Favourites = require("../Controllers/user/favourites") ;
const Filters = require("../Controllers/user/filter") ;
const conversation = require("../Controllers/user/conversation") ;
const message = require("../Controllers/user/message") ;

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

//For adoption
router.post('/post/adoptions',(req,res)=>{
    Adoption.addpet(req,res) ;
}) ;
router.get('/get/adoptions',(req,res)=>{
    Adoption.getpet(req,res) ;
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
router.get("messages/:conversationId",async(req,res)=>{
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

 //

module.exports=router;