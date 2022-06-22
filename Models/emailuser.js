const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
        email:String,
        mobile:String
});
const Email = mongoose.model('EmailUser',schema);
module.exports=Email;