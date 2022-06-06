const express = require("express");
const router = express.Router();
const Authentication = require("../Controllers/user/auth_user");
const jwt=require("jsonwebtoken");

router.post('/register',upload.single ('file'), (req,res)=>{
    Authentication.register(req,res,bcrypt);
});

//For login
router.post('/login',(req,res)=>{
    Authentication.login(req,res,bcrypt,jwt);
});
router.get('/verifytoken/:token',(req,res)=>{
    Authentication.getAdmin(req,res,jwt);
});

//For register
router.post('/register',upload.single ('file'), (req,res)=>{
    Authentication.register(req,res,bcrypt);
});