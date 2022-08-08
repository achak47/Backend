const express = require("express");
const router = express.Router();

const Addadmin = require("../Controllers/admin/add") ;
const Getadmin = require("../Controllers/admin/getdetails") ;
const Addproduct = require("../Controllers/admin/addproducts") ;
const Getproduct = require("../Controllers/admin/getproduct") ;
const Middleware = require("../Utils/middlewares") ;
const Delete = require("../Controllers/admin/delete")

//adding 
router.post("/addbreed",Middleware.checkAdmin,(req,res)=>{
    Addadmin.addbreed(req,res) ;
})
router.post("/add_diseases",Middleware.checkAdmin,(req,res)=>{
    Addadmin.add_diseases(req,res) ;
})
router.post("/addallergies",Middleware.checkAdmin,(req,res)=>{
    Addadmin.addallergies(req,res) ;
})
router.post("/addproduct",Middleware.checkAdmin,(req,res)=>{
    Addproduct.addproduct(req,res) ;
})
router.post("/addsize",Middleware.checkAdmin,(req,res)=>{
    Addproduct.addsize(req,res) ;
})


//getting 
router.get("/getbreed",(req,res)=>{
    Getadmin.getbreed(req,res) ;
})
router.get("/get_diseases",(req,res)=>{
    Getadmin.get_diseases(req,res) ;
})
router.get("/getallergies",(req,res)=>{
    Getadmin.getallergies(req,res) ;
})
router.get("/getproduct",(req,res)=>{
    Getproduct.getproducts(req,res) ;
})
router.get("/getsizes",(req,res)=>{
    Getproduct.getsizes(req,res) ;
})

//deleting 
router.post("/deletebreed",Middleware.checkAdmin,(req,res)=>{
    Delete.deletebreed(req,res) ;
})
router.post("/deletedisease",Middleware.checkAdmin,(req,res)=>{
    Delete.deletedisease(req,res) ;
})
router.post("/deleteallergy",Middleware.checkAdmin,(req,res)=>{
    Delete.deleteallergy(req,res) ;
})





module.exports=router;