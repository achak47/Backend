const express = require("express");
const router = express.Router();
const Authentication = require("../Controllers/user/auth_user");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt-nodejs');


//For login
router.post('/login',(req,res)=>{
    Authentication.login(req,res,bcrypt,jwt);
});
router.get('/verifytoken/:token',(req,res)=>{
    Authentication.getuser(req,res,jwt);
});

//For register
router.post('/register', (req,res)=>{
    Authentication.register(req,res,bcrypt,jwt);
});

module.exports=router;