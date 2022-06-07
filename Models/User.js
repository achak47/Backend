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
        address: String,
        profile_pic: String 
    },{
        timestamps:true
    }
);
const Users = mongoose.model('Users',schema);
module.exports=Users;