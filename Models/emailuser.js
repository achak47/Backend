const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
        email:{
                type:String,
                unique:true
        },
        mobile:{
                type:String,
                unique:true}
});
const Email = mongoose.model('EmailUser',schema);
module.exports=Email;