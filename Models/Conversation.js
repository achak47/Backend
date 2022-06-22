const mongoose = require('mongoose') ;
const ConversationSchema = new mongoose.Schema({
   members:[String] ,
   pet:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Adoptions'
   }
},{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000,
    } ,
    timestamps:true
}
)

module.exports = mongoose.model("Conversations",ConversationSchema);
