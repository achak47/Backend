const Conversation = require("../../Models/Conversation");

const newconversations = async(req,res)=>{
    const result = await Conversation.findOne({members:{ $all: [req.body.receiverId , req.body.senderId] }})
    if(result) res.status(200).json("Added Conversation") ;
    else{
        new Conversation({
            members:[req.body.senderId, req.body.receiverId] ,
            pet:req.body.pet_id
        }).save((err,result)=>{
            if(err) throw err ;
            else res.status(200).json(result) ;
        }) ;
    }
}

const getuserconversation = async(req,res)=>{
    try{
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]}
        }).populate({path:'members',select:'name email phone profile_pic'})
        .populate({path:'pet'}) ;
      res.status(200).json(conversation) ;
    }
    catch(err){
        res.status(500).json(err) ;
    }
}

const getconversationwithid = async(req,res)=>{
    try{
        const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstuserId,req.params.seconduserId]} ,
        });
        res.status(200).json(conversation) ;
       }
       catch(err){
           res.status(500).json(err) ;
       }
}

module.exports = {
    newconversations ,
    getuserconversation ,
    getconversationwithid
}
