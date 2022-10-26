const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
        name: String,
        type: String,
        gender:String,
        age:String,
        colour:String,
        breed:String,
        primary_breed:String,
        allergies:[String],
        diseases:[String],
        disabilities:[String],
        location: String,
        isVaccinated:{
         type:Boolean,
         default:false
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        },
        picture: String 
    },{
        timestamps:true
    }
);
const Pets = mongoose.model('Pets',schema);
module.exports=Pets;