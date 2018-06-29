var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var schema= new Schema({
    "Id" : {type:String},
    "type":{type:String},
    "mailid":{type:String},

    "Password":{type:String}
    })

module.exports=mongoose.model('password',schema);
