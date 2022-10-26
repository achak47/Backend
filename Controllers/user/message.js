const Message = require("../../Models/Message");

const addmessages = async(req,res)=>{
    const newMessage = new Message(req.body)
    try{
      const saveMessage = await newMessage.save() ;
      res.status(200).json(saveMessage) ;
    }catch(err){
        console.log(err)
         res.status(500).json(err) ;
    }
}

const getmessages = async(req,res)=>{
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages)
        } catch(err){
            res.status(500).json(err) ;
        }
}

module.exports = {
    addmessages , 
    getmessages
}