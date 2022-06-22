const mongoose = require('mongoose') ;
const schema = new mongoose.Schema({
   breeds:[{ type: String, unique: true }]
}) ;

module.exports = mongoose.model('Breeds',schema) ;