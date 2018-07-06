var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var schema= new Schema({
    "Id" : {type:String},
    "Parent_type":{type:String},
    "type":{type:String},
    "mailid":{type:String},
    "School_Id":{type:String},
    "Password":{type:String}
    })

module.exports=mongoose.model('registrations',schema);
