 
const catchAsync = require('../utils/catchAsync'); 

var collection = require('../models/collection'); 
const dateformat = require('date-and-time');
var Applynow = require('../models/applyloan'); 
var loandetails = require('../models/loandetails'); 

const dashboarddetails = catchAsync(async (req, res) => {
    const date = new Date(); 
    const todaydate = dateformat.format(date,'YYYY-MM-DD');
    const todaydatemonth = dateformat.format(date,'YYYY-MM-DD');
    
    var record = await  collection.find({date:todaydate,status:0}).sort({status:0});
    var totalrecord = await  collection.find({status:0}).sort({status:0});
    var customers  = await  Applynow.find({application_status:0}).sort({status:0});
    var customersamount  = await  loandetails.find({date:todaydatemonth,status:0}).sort({status:0});
    var overalamount  = await  loandetails.find({status:0}).sort({status:0});
    var livecustomer = await Applynow.aggregate([
        {"$group" : {_id:"$customer_id"}}
    ])
    console.log(livecustomer.length);
   // if (record && record.length > 0) {
         
        var amount = 0;
        for(i=0; i < record.length; i++)  
        {           
            amount += record[i].amount;
                
        } 
        var totalamount = 0;
        for(i=0; i < totalrecord.length; i++)  
        {           
            totalamount += totalrecord[i].amount;
                
        } 
        var headeramount = 0;
        for(i=0; i < customers.length; i++)  
        {           
            headeramount += customers[i].amount;
                
        }
        var balanceamount = 0;
        for(i=0; i < customersamount.length; i++)  
        {           
            balanceamount += customersamount[i].amount_paid;
                
        }
        
        let Data = {
            "Live customers":livecustomer.length,
            "Collected amount":amount,
            "To Collect amount":balanceamount - amount,
            "Outstanding amount":headeramount - totalamount,
            "Overall Loan":headeramount

        }          
        res.send({
            code: 200,
            success: true,
            message: "Data Retrieved Success.",
            data: Data,
        })
    // } else {
    //     res.send({
    //         code: 201,
    //         success: false,
    //         message: "No Data exists.",
    //         timestamp: new Date()
    //     });
    // }
    
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
    dashboarddetails
};