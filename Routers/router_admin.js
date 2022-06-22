const express = require("express");
const router = express.Router();

const Addadmin = require("../Controllers/admin/add") ;

//adding a breed
router.post("/addbreed",(req,res)=>{
    Addadmin.addbreed(req,res) ;
})

module.exports=router;