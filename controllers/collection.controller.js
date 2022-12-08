 
const catchAsync = require('../utils/catchAsync'); 

var collection = require('../models/collection'); 
var loandetails = require('../models/loandetails'); 
var Applynow = require('../models/applyloan'); 
const dateformat = require('date-and-time');
const multer = require('multer');
const { AugmentedAIRuntime } = require('aws-sdk');
var moment = require('moment');



const collectiondetails = catchAsync(async (req, res) => {
    let values = req.body;
    let query = {}
    if (values.hasOwnProperty("status")) {
        query.status = values.status;
    }
    if (values.hasOwnProperty("loan_id")) {
        query.loan_id = values.loan_id;
    }
    var newdata = new Array();
    collection.find(query).lean().exec().then((Result) => {
        for (let i = 0; i < Result.length; i++) 
        { 
           
            let Data =  {
                "id":Result[i].id,
                "user_id":Result[i].user_id,
                "cust_id" : Result[i].cust_id,
                "loan_id" : Result[i].loan_id,
                "amount" : Result[i].amount,
                "date" : moment(Result[i].date).format('YYYY-MM-DD'),
                "status" :Result[i].status
            };
        
            newdata.push(Data);
        }
        if (newdata && newdata.length > 0) {
            res.send({
                code: 200,
                success: true,
                message: "Data Retrieved Success.",
                data: newdata,
                timestamp: new Date()
            })
        } else {
            res.send({
                code: 201,
                success: false,
                message: "No Data exists.",
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

const addcollection = catchAsync(async (req, res) => {
   
    let values = req.body; 
    if (values.cust_id != '' && values.cust_id != null && values.cust_id != undefined) 
    {

        var Previouscustomer = await collection.findOne().sort('-id').lean().exec(); 
        var customers_loan_header  = await  Applynow.findOne({id:values.loan_id}).sort({status:0});
        Date.prototype.addDays = function(days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
        var date = customers_loan_header.date;
        let alldate = date.addDays(1);
       let currentdate =  new Date(values.date).addDays(1);
        var customers_loan_details  = await  loandetails.findOne({header_id:customers_loan_header.id ,"date":new Date(values.date),status:0}).sort("id").lean().exec();
        if(Previouscustomer != null && Previouscustomer != '' && Previouscustomer != undefined)
        {
            if(Previouscustomer.hasOwnProperty('id') != null){
                id = Previouscustomer.id + 1;
            }else{
                id = 1;
            }
        }
        else
        {
             id = 1;
        }
                  

        if(customers_loan_details != '' && customers_loan_details != null && customers_loan_details != undefined)
        {   
            let Data = {
                id : id, 
                user_id: values.user_id,  
                cust_id: values.cust_id,  
                loan_id: values.loan_id,  
                amount: values.amount,  
                date: new Date(values.date),  
                createdAt: new Date(),
                updatedAt: new Date(),
                lastModifiedAt: new Date(),
                LastModifiedBy: '',

            }
            // let query = {
            //     id:customers_loan_details.id
            // }
            
            // let newrecord = 
            // {
            //     payment_status:1,
            // };

            // let changes = {
            //     $set:newrecord
            // }

            // loandetails.updateOne(query, changes, {upsert:true}).lean().exec().then();
            collection(Data).save().then(); 
            res.send({
                success: true,
                code: 200,
                message: "Collection Added Successfully", 
            });
        }
        else
        {
            res.send({
                success: false,
                code: 201,
                message: "Loan collected date cannot be before start date", 
            });
        }
        
    } 
    else 
    {
        res.send({
            code: 201,
            success: false,
            status: "All Fields are Mandatory",
            timestamp: new Date()
        });
    }
});
 



const Updatecollection = catchAsync(async (req, res) => {
    let values = req.body; 
    if(values.id != '' && values.id != null && values.id != undefined){
        let query = {
            id:values.id
        }
        let Data = req.body;
        
        let changes = {
            $set:Data
        }
       
        collection.updateOne(query, changes, {upsert:true}).lean().exec().then((UpdateStatus) => {
        res.send({
            code: 200,
            success: true,
            message: "Customer Update Success.",
            timestamp: new Date()
        })
    }).catch((err) => {
        res.send({
            code: 201,
            success: false,
            message: "DATABASE_ERROR.",
            timestamp: new Date()
        });
    })
}else{
    res.send({
        code:201,
        success: false,
        message:"Id required to update Customers.",
        data:{},
        timestamp: new Date()
    });
}
});

 
const deletecollection = catchAsync(async (req, res) => {
    let values = req.body;
    let query = values;
    let changes = {
        $set: {
            status: 1
        }
    }
    collection.updateOne(query, changes, { upsert: true }).lean().exec().then((UpdateStatus) => {
        console.log(UpdateStatus);
        res.send({
            code: 200,
            success: true,
            message: "Collection Deleted Success.",
            timestamp: new Date()
        })
    }).catch((err) => {
        res.send({
            code: 201,
            success: false,
            message: "DATABASE_ERROR.",
            timestamp: new Date()
        });
    })
});
///////////////
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
} 

module.exports = {
    collectiondetails,
    addcollection,
    Updatecollection,
    deletecollection ,
};