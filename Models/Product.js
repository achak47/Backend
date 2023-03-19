const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
    name: String,
    brand : String ,
    animal_type :[String] ,
    foodform : String ,
    specialneeds : String ,
    lifestage: [String] ,
    breedsize: [String] ,
    flavours: String ,
    desc: String ,
    ingredients: String ,
    image: [String] ,
    rating : mongoose.Schema.Types.Decimal128 ,
    details : [String] ,
    manufacture_addr: String ,
    pack_addr: String ,
    sizes :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Size'
    }]
},{
    timestamps:true
}) ;

module.exports=mongoose.model('Products',schema);