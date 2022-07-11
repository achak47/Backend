const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
    name: {
        type:String ,
        unique:true
    },
    brand : String ,
    animal_type :[String] ,
    foodform : String ,
    specialneeds : String ,
    lifestage: [String] ,
    breedsize: [String] ,
    flavours: String ,
    desc: String ,
    ingredients: String ,
    analysis: String , 
    image: String ,
    rating : mongoose.Schema.Types.Decimal128 ,
    details : [String] ,
    sizes :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Size'
    }]
},{
    timestamps:true
}) ;

module.exports=mongoose.model('Products',schema);