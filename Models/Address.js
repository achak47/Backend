const mongoose = require('mongoose') ;
const schema = ({
  city : String ,
  pin : String ,
  line1 : String ,
  line2 : String ,
  landmark : String ,
  phone: String ,
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
}
})

module.exports = mongoose.model('Address',schema) ;