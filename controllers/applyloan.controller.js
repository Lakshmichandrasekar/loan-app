const catchAsync = require('../utils/catchAsync'); 
var Applynow = require('../models/applyloan'); 
var loandetails = require('../models/loandetails'); 
var customer = require('../models/customer');
var collection = require('../models/collection'); 
const dateformat = require('date-and-time');
const await = require('await');
var moment = require('moment');

const applynowdetails = catchAsync(async (req, res) => {
    var values = req.body;
    if(values.loan_type == 1) 
    {
        payment = values.amount/values.period; 
        message = "Daily amount"
    }
    else if(values.loan_type == 2)
    {
        payment =  values.amount/values.period;
        message = "Weekly amount"
    }
    else
    {
        payment = values.amount * values.interest/100; 
        message = "Monthly amount"
    }
    let Data = {
        amount :payment
    }
    res.send({
        code: 200,
        success: true,
        message: message,
        data: Data,
        timestamp: new Date()
    }) 
   
}); 

 
const addapplydaily = catchAsync(async (req, res) => {
    let values = req.body;
    if(values.date !='' && values.date != null && values.date != undefined)
    {
        console.log("manuall");
        // Date.prototype.addDays = function(days) {
        //     this.setDate(this.getDate() + parseInt(days));
        //     return this;
        // };
        // const date = new Date(); 
        // var alldate = date.addDays(0);
        var alldate = new Date(values.date);
    }
    else
    {
        
        console.log("today");
        Date.prototype.addDays = function(days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
        };
        const date = new Date(); 
        var alldate = date.addDays(0);
    }
    if(values.loan_type == 1)
    {
        console.log("day");
        
        if (values.customer_id != '' && values.customer_id != null && values.customer_id != undefined) 
        {
            var Previousdaily = await Applynow.findOne().sort('-id').lean().exec(); 
            var Previousloan = await loandetails.findOne().sort('-id').lean().exec(); 
            let id = 1;
            if(Previousdaily != null && Previousdaily != '' && Previousdaily != undefined)
            {
                if(Previousdaily.hasOwnProperty('id')){
                    id = Previousdaily.id + 1;
                }else{
                    id = id;
                }
            }
            else
            {
                id = 1;
            }
            console.log(dateformat.format(alldate,'YYYY-MM-DD'));
            let Data = {
                id : id, 
                customer_id: values.customer_id, 
                loan_type: values.loan_type,
                amount: values.amount,
                date : dateformat.format(alldate,'YYYY-MM-DD'),
                period: values.period,
                loan_no : "Loan00" + id,
                amount_paid: values.amount_paid,
                //payment_status: values.payment_status,
               // application_status: values.application_status,
                status: 0,
                createdAt: new Date(),
                updatedAt: new Date(), 
            }
            Date.prototype.addDays = function(days) {
                this.setDate(this.getDate() + parseInt(days));
                return this;
            };
            Applynow(Data).save().then()
                const date = new Date(); 
                var arr = new Array();
                for (let i = 0; i < values.period; i++) 
                {
                    if(i == 0 && Previousloan != null){
                        loanid = Previousloan.id + 1;
                       
                    }
                    else if(Previousloan == null )
                    {
                        loanid = 1;
                    }
                    else
                    {
                        loanid = Previousloan.id + i ;
                        
                    }
                    console.log(loanid);
                    let alldateloan = alldate.addDays(1);
                    let entry =
                    {
                        id:loanid + i ,
                        header_id :id,
                        amount_paid : values.amount_paid,
                        date : dateformat.format(alldateloan,'YYYY-MM-DD'),
                        createdAt: new Date(),
                        updatedAt: new Date(), 
                    }
                    
                    loandetails(entry).save().then();
                    let element = {
                        id:entry.id,
                        loan_no:Data.loan_no,
                    }
                    arr.push(element)
                }
               
                res.send({
                    success: true,
                    code: 200,
                    message: "Loan Applied",
                    //data: arr,
                });
            
        } else {
            res.send({
                code: 201,
                success: false,
                status: "All Fields are Mandatory",
                timestamp: new Date()
            });
        }
    }
    else if(values.loan_type == 2)
    {
        console.log("week");
        if (values.customer_id != '' && values.customer_id != null && values.customer_id != undefined) 
        {
            var Previousdaily = await Applynow.findOne().sort('-id').lean().exec(); 
            var Previousloan = await loandetails.findOne().sort('-id').lean().exec(); 
            if(Previousdaily != null && Previousdaily != '' && Previousdaily != undefined)
            {
                if(Previousdaily.hasOwnProperty('id')){
                    id = Previousdaily.id + 1;
                }else{
                    id = id;
                }
            }
            else
            {
                id = 1;
            }
            let Data = {
                id : id, 
                customer_id: values.customer_id, 
                loan_type: values.loan_type,
                amount: values.amount,
                interest: values.interest,
                loan_no : "Loan00" + id,
                date : dateformat.format(alldate,'YYYY-MM-DD'),
                period: values.period,
                amount_paid: values.amount_paid,
               // payment_status: values.payment_status,
                //application_status: values.application_status,
                status: 0,
                createdAt: new Date(),
                updatedAt: new Date(), 
            }
            Date.prototype.addDays = function(days) {
                this.setDate(this.getDate() + parseInt(days));
                return this;
            };
            Applynow(Data).save().then((Result) => { 
                const date = new Date(); 
                var arr = new Array();
                for (let i = 0; i < values.period; i++) 
                {
                    if(i == 0 && Previousloan != null){
                        loanid = Previousloan.id + 1;
                       
                    }
                    else if(Previousloan == null )
                    {
                        loanid = 1;
                    }
                    else
                    {
                        loanid = Previousloan.id + i ;
                        
                    }
                   let alldateloan = alldate.addDays(7);
                    let entry =
                    {
                        id:loanid +i,
                        header_id :id,
                        amount_paid : values.amount_paid,
                        date : dateformat.format(alldateloan,'YYYY-MM-DD'),
                        createdAt: new Date(),
                        updatedAt: new Date(), 
                    }
                    loandetails(entry).save().then()
                    let element = {
                        id:entry.id,
                        loan_no:Data.loan_no,
                    }
                    arr.push(element)
                }
            res.send({
                success: true,
                code: 200,
                message: "Loan Applied ",
               // data: arr,
            });
            }).catch((err) => {
                console.error('Database Error');
                console.error(err);
                res.send({
                    success: false,
                    code: 200,
                    message: "Database Error", 
                    "timestamp": new Date()
    
                });
            })
        } else {
            res.send({
                code: 201,
                success: false,
                status: "All Fields are Mandatory",
                timestamp: new Date()
            });
        }
    }
    else
    {
        if (values.customer_id != '' && values.customer_id != null && values.customer_id != undefined) 
        {
            var Previousdaily = await Applynow.findOne().sort('-id').lean().exec(); 
            var Previousloan = await loandetails.findOne().sort('-id').lean().exec(); 
            if(Previousdaily != null && Previousdaily != '' && Previousdaily != undefined)
            {
                if(Previousdaily.hasOwnProperty('id')){
                    id = Previousdaily.id + 1;
                }else{
                    id = id;
                }
            }
            else
            {
                id = 1;
            }
            let Data = {
                id : id, 
                customer_id: values.customer_id, 
                loan_type: values.loan_type,
                loan_no : "Loan00" + id,
                amount: values.amount,
                interest: values.interest,
                date : dateformat.format(alldate,'YYYY-MM-DD'),
                period: values.period,
                amount_paid: values.amount_paid,
                //payment_status: values.payment_status,
                //application_status: values.application_status,
                status: 0,
                createdAt: new Date(),
                updatedAt: new Date(), 
            }
            Date.prototype.addDays = function(days) {
                this.setDate(this.getDate() + parseInt(days));
                return this;
            };
            Applynow(Data).save().then((Result) => { 
                const date = new Date(); 
                var arr = new Array();
                
                for (let i = 0; i < values.period; i++) 
                {
                    if(i == 0 && Previousloan != null){
                        loanid = Previousloan.id + 1;
                       
                    }
                    else if(Previousloan == null )
                    {
                        loanid = 1;
                    }
                    else
                    {
                        loanid = Previousloan.id + i ;
                        
                    }
                    var newDate = new Date(alldate.setMonth(alldate.getMonth()+1));
                    console.log(newDate);
                    console.log(alldate);
                    let entry =
                    {
                        id:loanid +i,
                        header_id :id ,
                        amount_paid : values.amount_paid,
                        date : dateformat.format(newDate,'YYYY-MM-DD'),
                        createdAt: new Date(),
                        updatedAt: new Date(), 
                    }
                    loandetails(entry).save().then()
                    let element = {
                        id:entry.id,
                        loan_no:Data.loan_no,
                    }
                    arr.push(element)
                }
            res.send({
                success: true,
                code: 200,
                message: "Loan Applied ",
                //data: arr,
            });
            }).catch((err) => {
                console.error('Database Error');
                console.error(err);
                res.send({
                    success: false,
                    code: 200,
                    message: "Database Error", 
                    "timestamp": new Date()

                });
            })
        } else {
            res.send({
                code: 201,
                success: false,
                status: "All Fields are Mandatory",
                timestamp: new Date()
            });
        }
    }
});

const getloandetails = catchAsync(async (req, res) => { 
    
    let query = req.body;
    var record = await Applynow.findOne(query).sort('id').lean().exec();
    if(record != '' && record != null && record != undefined)
    {
        var totalrecord = await Applynow.find(query).sort('customer_id').lean().exec();
        //var record_date = await loandetails.findOne({header_id:record.id}).sort('date').lean().exec();
        
       
        
        var newdata = new Array();
        
        if(record.payment_status == 0)
        { 
            status_payment = "paid"
        }
        else 
        {
            status_payment = "unpaid"
        }
        //var loanDetails = new Array();
      // let  currentdate =dateformat.format(new Date(),'YYYY-MM-DD ');
        for (let i = 0; i < totalrecord.length; i++) 
        {    
            console.log("hello");
            var record_date = await loandetails.find({header_id:totalrecord[i].id,status:0}).sort('date').lean().exec();
            var collection_record = await collection.find({loan_id:totalrecord[i].id,status:0}).sort('date').lean().exec();
            
            
            
            var loanDetails = new Array();
            // console.log(finalamount);
           
            var total_record_date = moment(record_date[0].date).format('YYYY-MM-DD');
            
            let  currentdate =dateformat.format(new Date(),'YYYY-MM-DD');
            
            var record_date_total = await loandetails.find({header_id:totalrecord[i].id ,status:0,date:new Date(currentdate)}).sort('date').lean().exec();
            console.log(new Date(currentdate));
            if(currentdate > total_record_date)
            {
                if(record_date_total !='' && record_date_total != undefined && record_date_total != null)
                {
                    if(record_date[1] != undefined && record_date[1] != '')
                    {
                        Date.prototype.addDays = function(days) {
                            this.setDate(this.getDate() + parseInt(days));
                            return this;
                        };
                        
                       let todaydate =  new Date().addDays(0);
                        var balace = await loandetails.find({header_id:totalrecord[i].id ,status:0,"date":{ $gte:record_date[0].date, $lt:new Date(todaydate) }}).sort('id').lean().exec();
                        var total_collection = await collection.find({loan_id:totalrecord[i].id ,status:0,"date":{ $gte:record_date[0].date, $lt:new Date(todaydate) }}).sort('id').lean().exec();
                        var balanceamount = 0;
                        for(l=0; l < balace.length; l++)  
                        {           
                            balanceamount += balace[l].amount_paid;
                                
                        }
                        var collectionamount = 0;
                        for(p=0; p < total_collection.length; p++)  
                        {           
                            collectionamount += total_collection[p].amount;
                                
                        }
                        if(collectionamount != '' && collectionamount != null  && collectionamount != undefined)
                        {
                            totalamount = balanceamount - collectionamount;
                        }
                        else
                        {
                            totalamount = balanceamount;
                        }
                        let Data =  {
                            "loan_type" : totalrecord[i].loan_type,
                            "loan_id" : totalrecord[i].id,
                            "amount" : totalrecord[i].amount,
                            "period" : totalrecord[i].period,
                            "interest" : totalrecord[i].interest,
                            "loan_created":moment(totalrecord[i].date).format('YYYY-MM-DD'),
                            "dueamount" : totalamount,
                            "nextduedate" :moment(record_date_total[0].date).format('YYYY-MM-DD'),
                            //"payment_status" : status_payment
                        };
                        loanDetails.push({
                            "Loan_no":totalrecord[i].loan_no,
                            "amount_paid":totalamount,
                            "date":moment(record_date_total[0].date).format('YYYY-MM-DD'),
                        });
                        Data.loan_details = loanDetails
                        newdata.push(Data);
                    }
                }
            }
            else
            {
                if(record_date_total !='' && record_date_total != undefined && record_date_total != null)
                {
                    if(record_date[1] != undefined && record_date[1] != '')
                    {
                        console.log("222");
                        Date.prototype.addDays = function(days) {
                            this.setDate(this.getDate() + parseInt(days));
                            return this;
                        };
                        
                        let todaydate =  new Date().addDays(0);
                        var balace = await loandetails.find({header_id:totalrecord[i].id ,status:0,"date":{ $gte:record_date[0].date, $lt:new Date(todaydate) }}).sort('id').lean().exec();
                        var total_collection = await collection.find({loan_id:totalrecord[i].id ,status:0,"date":{ $gte:record_date[0].date, $lt:new Date(todaydate) }}).sort('id').lean().exec();
                        var balanceamount = 0;
                        for(l=0; l < balace.length; l++)  
                        {           
                            balanceamount += balace[l].amount_paid;
                                
                        }
                        var collectionamount = 0;
                        for(p=0; p < total_collection.length; p++)  
                        {           
                            collectionamount += total_collection[p].amount;
                                
                        }
                        if(collectionamount != '' && collectionamount != null  && collectionamount != undefined)
                        {
                            totalamount = balanceamount - collectionamount;
                        }
                        else
                        {
                            totalamount = balanceamount;
                        }
                    
                        let Data =  {
                            "loan_type" : totalrecord[i].loan_type,
                            "loan_id" : totalrecord[i].id,
                            "amount" : totalrecord[i].amount,
                            "period" : totalrecord[i].period,
                            "interest" : totalrecord[i].interest,
                            "loan_created":moment(totalrecord[i].date).format('YYYY-MM-DD'),
                            "dueamount" : totalamount,
                            "nextduedate" :moment(record_date[0].date).format('YYYY-MM-DD'),
                            //"payment_status" : status_payment
                        };
                        loanDetails.push({
                            "Loan_no":totalrecord[i].loan_no,
                            "amount_paid":totalamount,
                            "date":moment(record_date[0].date).format('YYYY-MM-DD'),
                        });
                        Data.loan_details = loanDetails
                        newdata.push(Data);
                    }
                }
            }
           
           
        }
        
        res.send({
            success: true,
            code: 200,
            message: "Loan Applied ",
            data: newdata,
        });
    }
    else
    {
        res.send({
            success: false,
            code: 201,
            message: "No records in DB ",
            data: [],
        });
    }
});

const listloandetails = catchAsync(async (req, res) => { 
    let query = req.body;
    
    if(query.loan_type != '' && query.loan_type != null && query.loan_type != undefined && query.city != 0)
    {
        console.log("111");
        var customerdetails  = await customer.find({status:0,city:query.city}).sort('date').lean().exec();
       
        // var record = await Applynow.find({"date":"17/8/2022","loan_type":query.loan_type}).sort('id').lean().exec();
    }
    else
    {
        console.log("222");
       // var record = await Applynow.find().sort('id').lean().exec();
       var customerdetails  = await customer.find().sort('date').lean().exec();
    }
   
    if(customerdetails != '' && customerdetails != null && customerdetails != undefined)
    {
        
        var newdata = new Array();
        
        for (let i = 0; i < customerdetails.length; i++) 
        {    
            if(query.loan_type != '' && query.loan_type != null && query.loan_type != undefined && query.is_today == 1 && query.city != 0)
            {
                console.log("!empty");
                console.log(customerdetails[i].id);
                let  currentdate =dateformat.format(new Date(),'YYYY-MM-DD');
                var record = await Applynow.find({"loan_type":query.loan_type,customer_id:customerdetails[i].id}).sort('loan_no').lean().exec();
                
            }
            else if(query.is_today == 1 && query.city != 0)
            {
                console.log("1");
                let  currentdate =dateformat.format(new Date(),'YYYY-MM-DD ');
                var record = await Applynow.find({"loan_type":query.loan_type,customer_id:customerdetails[i].id}).sort('loan_no').lean().exec();
            }
            else if(query.is_today != 0 && query.city == 0)
            {
                console.log("0");
                var record = await Applynow.find({"loan_type":query.loan_type,customer_id:customerdetails[i].id}).sort('id').lean().exec();
            }
            // else
            // {
            //     console.log("empty");
            //     var record = await Applynow.find({customer_id:customerdetails[i].id}).sort('id').lean().exec();
            // }
            var loanDetails = new Array();
            if(record != '' && record != null && record != undefined)
            {
               
                
                for(let j=0; j<record.length; j++ )
                {
                    let  currentdate =dateformat.format(new Date(),'YYYY-MM-DD');
                    if(query.is_today == 1 && query.city != 0)
                    {
                        var record_date_total = await loandetails.find({header_id:record[j].id,date:new Date(currentdate)}).sort('date').lean().exec();
                    }
                    else
                    {
                        console.log("today");
                        var record_date_total = await loandetails.find({header_id:record[j].id}).sort('date').lean().exec();
                        

                    }
                    console.log(record_date_total);
                    if(record_date_total != '' && record_date_total !=null && record_date_total != undefined )
                    {
                        var message = "Data Retrieved Success";
                        if(query.loan_type != '' && query.loan_type != null && query.loan_type != undefined && query.is_today != 0)
                        {
                            var record_date = await loandetails.find({header_id:record[j].id,status:0}).sort('date').lean().exec();
                            var loanDetails = new Array();
                            // console.log(finalamount);
                        
                            var total_record_date = moment(record_date[0].date).format('YYYY-MM-DD');
                            
                            let  currentdate =dateformat.format(new Date(),'YYYY-MM-DD');
                            
                            var record_date_total = await loandetails.find({header_id:record[j].id ,status:0,date:new Date(currentdate)}).sort('date').lean().exec();
                            var record_date_collection = await collection.find({loan_id:record[j].id ,status:0,date:new Date(currentdate)}).sort('date').lean().exec();
                            if(currentdate > total_record_date)
                            {
                                if(record_date_total !='' && record_date_total != undefined && record_date_total != null)
                                {
                                    if(record_date[1] != undefined && record_date[1] != '')
                                    {
                                        Date.prototype.addDays = function(days) {
                                            this.setDate(this.getDate() + parseInt(days));
                                            return this;
                                        };
                                        
                                        let todaydate =  new Date().addDays(0);
                                        var balace = await loandetails.find({header_id:record[j].id ,status:0,"date":{ $gte:record_date[0].date, $lt:new Date(todaydate) }}).sort('id').lean().exec();
                                        var total_collection = await collection.find({loan_id:record[j].id ,status:0,"date":{ $gte:record_date[0].date, $lt:new Date(todaydate) }}).sort('id').lean().exec();
                                        var balanceamount = 0;
                                        for(l=0; l < balace.length; l++)  
                                        {           
                                            balanceamount += balace[l].amount_paid;
                                                
                                        }
                                        var collectionamount = 0;
                                        for(p=0; p < total_collection.length; p++)  
                                        {           
                                            collectionamount += total_collection[p].amount;
                                                
                                        }
                                        if(collectionamount != '' && collectionamount != null  && collectionamount != undefined)
                                        {
                                            totalamount = balanceamount - collectionamount;
                                        }
                                        else
                                        {
                                            totalamount = balanceamount;
                                        }
                                        console.log(balanceamount);
                                        console.log(collectionamount);
                                        if(record_date_collection != '' && record_date_collection != null && record_date_collection != undefined)
                                        {
                                            if(collectionamount != '' && collectionamount != null  && collectionamount != undefined)
                                            {
                                            
                                                if(balanceamount - collectionamount == 0)
                                                {
                                                    status_payment = "Paid"
                                                }
                                                else
                                                {
                                                    status_payment = "Partiallypaid"
                                                }
                                            }
                                            else
                                            {
                                                status_payment = "Unpaid"
                                            }
                                        }
                                        else
                                        {
                                            status_payment = "Unpaid"
                                        }
                                        let Data =  {
                                            "customer_id":customerdetails[i].id,
                                            "customer_name":customerdetails[i].name,
                                            "loan_type" : record[j].loan_type,
                                            "loan_id" : record[j].id,
                                            "loan_no" : record[j].loan_no,
                                            "dueamount" : totalamount,
                                            "nextduedate" :moment(record_date_total[0].date).format('YYYY-MM-DD'),
                                            "payment_status" : status_payment
                                        };
                                       
                                        newdata.push(Data);
                                    }
                                }
                            }
                            else
                            {
                                
                                if(record_date_total !='' && record_date_total != undefined && record_date_total != null)
                                {
                                    if(record_date != undefined && record_date != '')
                                    {
                                        Date.prototype.addDays = function(days) {
                                            this.setDate(this.getDate() + parseInt(days));
                                            return this;
                                        };
                                        
                                        let todaydate =  new Date().addDays(0);
                                        var balace = await loandetails.find({header_id:record[j].id ,status:0,"date":{ $gte:record_date[0].date, $lt:new Date(todaydate) }}).sort('id').lean().exec();
                                        var total_collection = await collection.find({loan_id:record[j].id ,status:0,"date":{ $gte:record_date[0].date, $lt:new Date(todaydate) }}).sort('id').lean().exec();
                                        var balanceamount = 0;
                                        for(l=0; l < balace.length; l++)  
                                        {           
                                            balanceamount += balace[l].amount_paid;
                                                
                                        }
                                        var collectionamount = 0;
                                        for(p=0; p < total_collection.length; p++)  
                                        {           
                                            collectionamount += total_collection[p].amount;
                                                
                                        }
                                        if(collectionamount != '' && collectionamount != null  && collectionamount != undefined)
                                        {
                                            totalamount = balanceamount - collectionamount;
                                        }
                                        else
                                        {
                                            totalamount = balanceamount;
                                        }
                                        console.log(balanceamount);
                                        console.log(collectionamount);
                                        if(record_date_collection != '' && record_date_collection != null && record_date_collection != undefined)
                                        {
                                            if(collectionamount != '' && collectionamount != null  && collectionamount != undefined)
                                            {
                                            
                                                if(balanceamount - collectionamount == 0)
                                                {
                                                    status_payment = "Paid"
                                                }
                                                else
                                                {
                                                    status_payment = "Partiallypaid"
                                                }
                                            }
                                            else
                                            {
                                                status_payment = "Unpaid"
                                            }
                                        }
                                        else
                                        {
                                            status_payment = "Unpaid"
                                        }
                                        let Data =  {
                                            "customer_id":customerdetails[i].id,
                                            "customer_name":customerdetails[i].name,
                                            "loan_type" : record[j].loan_type,
                                            "loan_id" : record[j].id,
                                            "loan_no" : record[j].loan_no,
                                            "dueamount" : totalamount,
                                            "nextduedate" :moment(record_date[0].date).format('YYYY-MM-DD'),
                                            "payment_status" : status_payment
                                        };
                                        newdata.push(Data);
                                    }
                                }
                            }
                            
                        }
                    }
                    
                }
                
                //newdata.push(loanDetails);
            }
            else
            {
                var message = "NO Data exits";
            }
           
        }
        
       
        res.send({
            success: true,
            code: 200,
            message: message,
            data: newdata,
        });
    }
    else
    {
        res.send({
            success: false,
            code: 201,
            message: "No records in DB ",
            data: [],
        });
    }
}); 
 
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = { 
    applynowdetails,
    addapplydaily,
    getloandetails,
    listloandetails
}