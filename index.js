// The entry point of the server file


var express = require("express")
var app = express() ;
var dotenv = require('dotenv') ;
dotenv.config();
const mongoose = require('./Models/config');
const cors = require('cors');
//const nodemailer=require("./Utils/nodemailer");


//Starting middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()) ;
app.use(cors()) ;
app.use('/',require('./Routers/router_user'));
app.use('/admin',require('./Routers/router_admin')) ;
//End of middlewares



app.listen(process.env.PORT || 5000 , (err)=> {
    if(err){
        console.log("Error in setting up server!");
        return;
    }
    console.log("Server running!");
})