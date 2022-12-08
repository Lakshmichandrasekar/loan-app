
const catchAsync = require('../utils/catchAsync');

const bcrypt = require('bcryptjs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
var User = require('../models/user');
let crypto = require('crypto');


const adduser = catchAsync(async (req, res) => {
    var personInfo = req.body;
    
    if(!personInfo.phonenumber){ 
        res.send();
    } else {
        
        User.findOne({phonenumber:personInfo.phonenumber},function(err,data){
            if(!data){
                if(personInfo.password == personInfo.confirm_password)
                {
                    var c;
                    User.findOne({},function(err,data){

                        if (data) {
                            c = data.id + 1;
                        }else{
                            c=1;
                        }
                        
                        var newPerson = new User({
                            id:c,
                            name:personInfo.name,
                            phonenumber:personInfo.phonenumber,
                            password: personInfo.password,
                            confirm_password: personInfo.confirm_password,
                            role: personInfo.role,
                            status: 0,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });

                        newPerson.save(function(err, Person){
                            if(err)
                            {
                                console.log(err);
                            }
                            else {
                                console.log('Success');
                            }
                        });

                    }).sort({_id: -1}).limit(1);
                    res.send({"Success":"You are regestered,You can login now."});
                }
                else
                {
                    res.send({"Success":"Confirm Password is Wrong!."});
                }
            }else{
                res.send({"Success":"Phonenumber is already used."});
            }

        });
        
    }
});

const userdetails = catchAsync(async (req, res) => {
    var personInfo = req.body;
    User.findOne({phonenumber:personInfo.phonenumber},function(err,data){
      //  var hash = crypto.createHash("md5").update(personInfo.password).digest("hex");
        console.log("data-----",data)
        if (data && data.phonenumber == personInfo.phonenumber && data.password ==  personInfo.password) {
            res.send({
                code: 200,
                success: true,
                message: "Login Success.",
                data: data,
                timestamp: new Date()
            })
        } else {
            res.send({
                code: 201,
                success: false,
                message: "User Name and Password is Incorrect",
                timestamp: new Date()
            });
        }
    }).catch((err) => {
        res.send({
            code: 201,
            success: false,
            message: "DATABASE_ERROR.",
            timestamp: new Date()
        });
    })
});

module.exports = {
    adduser,
    userdetails
}