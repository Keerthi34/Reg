
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({


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


/*  "Student_Id" : {type:String},
  "Name" : {type:String},
  "type":{type:String},
  "P_Name":{type:String},
  "Phone_Number":{type:String},
  "Mailid":{type:String}
*/

})

module.exports=mongoose.model('account',schema);
