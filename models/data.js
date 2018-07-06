
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

   School_Id: String,
  photo:String,
    admissionnumber:String,
    stid:{type:String},
    name:{type:String},
    lastname:String,
    mothername:String,
    fathername: String,
    guardian:String,
    phonenumber: String,
    mailid:String,
    class:String,
    bloogroup:String,
    address:String,
    type:{type:String},
    P_Name:{type:String},



})

module.exports=mongoose.model('account',schema);
