const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
        contact:{
                type:String,
                unique:true
        }
});
const Email = mongoose.model('EmailUser',schema);
module.exports=Email;