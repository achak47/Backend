const Product = require("../../Models/Product");
const Size = require("../../Models/Size");
const axios = require("axios");

const addproduct = async(req,res)=>{
    const {name,desc,brand,ingredients,rating,animal_type,foodform,breedsize,specialneeds,lifestage,flavours,details,manufacture_addr,pack_addr} = req.body ;
    new Product({
     name ,
     desc , 
     brand ,
     ingredients ,
     rating ,
     animal_type,
     foodform,
     specialneeds,
     breedsize,
     lifestage,
     flavours,
     details,
     manufacture_addr,
     pack_addr
    }).save((err,result)=>{
        if(err) res.status(400).json({"err":err , "msg":"An error occured"}) ;
        else res.status(200).json("Product added succesfully !!!") ; 
    })
}

const addsize = async(req,res)=>{
    const {price,size,specification,product,image,quantity,weight,mrp} = req.body ;
    const pdt = await Product.findOne({name:product}) ;
    console.log(pdt)
    s  = await Size.create({
        "price":price ,
        "size":size ,
        "tags":specification ,
        "image":image ,
        "product":pdt._id,
        "quantity":quantity,
        "weight":weight,
        "mrp":mrp
    })
        //if(err) res.status(400).json(err) ;
        console.log(s)
        pdt.sizes.push(s._id) ;
        pdt.save((err,result)=>{
            console.log(err)
            res.status(200).json("Size of Product added succesfully") ;
        })
}

const checkproduct = async(req,res)=>{
    const {name} = req.body ;
    const p = Product.find({name:name}) ;
    if(p.length>0) return res.status(200).json(1) ;
    res.status(200).json(0) ;
}
const addbysheet = async(req,res)=>{
    const pdts = await axios.get("https://script.google.com/macros/s/AKfycbxnjVHEEr-pE0Aoh4cdOgTNup7YlKJ7b04IWHLQ0zjPtGqh50mS6ZypbhAKoA3uN5l5/exec") ;
    //console.log(pdts.data.data) ;
    //res.status(200).json(pdts.data.data) ;
    pdts.data.data.forEach(async i=>{
        const p = await Product.find({name:i.name , brand:i.brand}) ;
        console.log(p)
        if(p.length == 0){
           //res.status(200).json(i) ;
           const pdt = new Product({
            name : i.name ,
            desc : i.desc , 
            brand : i.brand ,
            ingredients : i.ingredients ,
            analysis : i.analysis ,
            rating : i.rating ,
            animal_type : i.animal_type,
            foodform : i.foodform,
            specialneeds : i.specialneeds,
            breedsize : i.breedsize,
            lifestage : i.lifestage,
            flavours : i.flavours,
            details : i.details,
            image : i.image
           })
           await pdt.save()
        }
        setTimeout(()=>{ res.status(200).json("Done") } , 10000) ;
       })
}

const updatefromsheet = async(req,res)=>{
    const pdts = await axios.get("https://script.google.com/macros/s/AKfycbxnjVHEEr-pE0Aoh4cdOgTNup7YlKJ7b04IWHLQ0zjPtGqh50mS6ZypbhAKoA3uN5l5/exec") ;
    pdts.data.data.filter(f=>f.update=='1').forEach(async i =>{
        const p = await Product.find({name:i.name , brand:i.brand}) ;
        p.name = i.name ,
        p.desc = i.desc , 
        p.brand = i.brand ,
        p.ingredients = i.ingredients ,
        p.analysis = i.analysis ,
        p.rating = i.rating ,
        p.animal_type = i.animal_type,
        p.foodform = i.foodform,
        p.specialneeds = i.specialneeds,
        p.breedsize = i.breedsize,
        p.lifestage = i.lifestage,
        p.flavours = i.flavours,
        p.details = i.details,
        p.image = i.image
        await p.save()
    })
}
module.exports = {
    addproduct ,
    addsize ,
    addbysheet ,
    updatefromsheet ,
    checkproduct
}