const mongoose = require('mongoose') ;
const MessageSchema = new mongoose.Schema({
   conversationId:{
       type:String
   },
   sender:{
       type:String
   },
   text:{
       type:String
   }
},
{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000,
    } ,
    timestamps:true
}
)

module.exports = mongoose.model("Chats",MessageSchema);