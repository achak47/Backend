const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
        name: String,
        email: {
            type:String,
            unique:true,
            required:true
        },
        password: String,
        phone :  {
            type:String,
            unique:true,
        },
        //address: String,
        profile_pic: String,
        favourites:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Adoptions'
        }] , 
        address:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address'  
        }],
        cart:[{
            item:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Size'  
        },
        quantity:Number}] ,
        orders:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Size'
        }],
        shipped_orders:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Size'
        }],
        cancelled_orders:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Size'
        }]
    },{
        timestamps:true
    }
);
const Users = mongoose.model('Users',schema);
module.exports=Users;