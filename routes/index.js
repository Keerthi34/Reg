var express = require('express');
var router = express.Router();
var http = require("http");
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var path = require('path');
var xoauth2 = require('xoauth2');
var winston=require('winston');
var User=require('../models/data');
var Password=require('../models/password');

/*gmail authorization to send emails to the users*/
let transporter = nodemailer.createTransport({
    service:'gmail',

    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: 'keerthi.regnis@gmail.com',

  clientId: '487571564592-ebi9vkjo2tk10um0fq26gkn0k3u6v9vm.apps.googleusercontent.com',
  clientSecret: 'wwo0sYyKHTNzl9UJwgXDXBPc',
  refreshToken: '1/t87TEHx9TY6wr_KuoHhmbch7084TVjZxX51jRlDnaj0qWbtHhczmvLiFkSv28HFd'

 })
}
});

var email_smtp = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: 'keerthi.regnis@gmail.com',

clientId: '487571564592-ebi9vkjo2tk10um0fq26gkn0k3u6v9vm.apps.googleusercontent.com',
clientSecret: 'wwo0sYyKHTNzl9UJwgXDXBPc',
refreshToken: '1/t87TEHx9TY6wr_KuoHhmbch7084TVjZxX51jRlDnaj0qWbtHhczmvLiFkSv28HFd'
  }
});

/* Get all user records who got registered*/
router.get('/getuserdata', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  User.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  });
})


  /* Get individual record who got registered*/
  router.get('/getdata/:_id', function(req, res, next) {
    winston.log('info',"Info: Get individual record")
    console.log("info");
    User.findOne({_id:req.params._id},function(err,data){
        if(err)
        res.status(500).send(err);
        else {
          res.status(200).json(data);
        }
    });
  })


    /*Create new account for registration*/
        router.post('/createaccount',function(req,res,next){
          winston.log('info',"Info level")
          var t=new User({
           stid:1,

           photo:req.body.photo,
             admissionnumber:req.body.admissionnumber,

             name:req.body.name,
             lastname:req.body.lastname,
             mothername:req.body.mothername,
             fathername: req.body.fathername,
             guardian:req.body.guardian,
             phonenumber: req.body.phonenumber,
             mailid:req.body.mailid,
             class:req.body.class,
             bloogroup:req.body.bloogroup,
             address:req.body.address,
             type:req.body.Parent_type,
             P_Name:req.body.Parent_Name,


           /*
            Name:req.body.Name,
            type:req.body.Parent_type,
            P_Name:req.body.Parent_Name,
           Phone_Number: req.body.Phone_Number,
            Mailid:req.body.Mailid

            */
          })
          t.save(function(err,suc){
              if(err)
              res.send(err)
              else {

                User.count({}, function( err, count){

                  var sc="S"+count++
                  User.findOneAndUpdate({_id:suc.id}, {stid:sc}, {upsert:true}, function(err, doc){
              if (err) return res.status(500).send( { error: err });
              return res.status(201).send({"Message":"Created", type:"internal"});
          })
          })

          //mailing
          var mailOptions = {
              from: 'keerthi.regnis@gmail.com', // sender address
              to: req.body.mailid, // list of receivers
              subject: 'link to change password', // Subject line
              text: 'http://10.10.5.54:4200/changepassword/'+suc._id           +'     Click on the link' // html body
          };
          email_smtp.sendMail(mailOptions, (error, info) => {
              if (error) {
                  res.send("dsfds "+error);
              }else {
                res.send(info);
              }
              });
              //  res.send(suc)
              }
              function getNextSequenceValue(sequenceName){

                var sequenceDocument = db.counters.findOneAndUpdate(
                  { "_id" : sequenceName },
                   { $inc : { sequence_value : 1 } },
                   { new : true }
                 );
             return sequenceDocument.sequence_value;
           }
          })
        })



        /*new post */

              router.post('/post' ,function(req,res,next)
              { // winston.log('info',"this is admission details page");

                var student= new User({
                  photo:req.body.photo,
                  admissionnumber: req.body.admissionnumber,
                  stid:1,
                  name: req.body.name,
                  lastname: req.body.lastname,
                  mothername: req.body.mothername,
                  fathername: req.body.fathername,
                  guardian: req.body.guardianname,
                  phonenumber: req.body.phonenumber,
                  mailid: req.body.mailid,
                  class: req.body.class,
                  bloogroup: req.body.bloogroup,
                  address: req.body.address,
                  type:req.body.Parent_type,
                  P_Name:req.body.Parent_Name


                })
                  student.save({},function (err,suc) {
                  if (err)

                    res.status(404).send({error:err.message})

                  else{
                    //res.send("saved")

                  User.count({}, function( err, count){

                    var sc="EX"+count++
                    console.log("dfd "+suc.id)
                  //  console.log("dfd "+suc.type)
                    User.findOneAndUpdate({_id:suc.id}, {stid:sc},  {upsert:true}, function(err, doc){
                     // console.log(success)
                      if (err) return res.send({status:500, message: 'internal error', type:'internal'});

                      return res.status(201).send({message: 'create student record', type:'internal'});
                    })

                  })
                  //mailing
                  var mailOptions = {
                      from: 'keerthi.regnis@gmail.com', // sender address
                      to: req.body.mailid, // list of receivers
                      subject: 'link to change password', // Subject line
                      text: 'http://10.10.5.54:4200/changepassword/'+suc._id                  +'     Click on the link' // html body
                  };
                  email_smtp.sendMail(mailOptions, (error, info) => {
                      if (error) {
                          res.send("dsfds "+error);
                      }else {
                        res.send(info);
                      }
                      });



                  //  res.send(suc)
                }
                function getNextSequenceValue(){

                  var sequenceDocument = db.counters.findOneAndUpdate(
                    { "_id" : sequenceName },
                    { $inc : { sequence_value : 1 } },
                    { new : true }
                  );
                  return sequenceDocument.sequence_value;
                }


              })

              })


/*save password*/
router.post('/savepassword/:_id', function(req,res,next){

  var t= new Password({
    Id:req.body.Id,
    type:req.body.type,
    mailid:req.body.mailid,

    Password:req.body.Password

  })

    t.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })


})
module.exports = router;
