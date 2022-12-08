 
const catchAsync = require('../utils/catchAsync'); 

var customer = require('../models/customer'); 
const multer = require('multer');




const customerdetails = catchAsync(async (req, res) => {
    let values = req.body;
    let query = {}
    if (values.hasOwnProperty("status")) {
        query.status = values.status;
    }
    
    customer.find(query).lean().exec().then((Result) => {
        if (Result && Result.length > 0) {
            res.send({
                code: 200,
                success: true,
                message: "Data Retrieved Success.",
                data: Result,
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

const addcustomer = catchAsync(async (req, res) => {
    let values = req.body;
    var url  = 'https://loanapp-production.herokuapp.com/';
    if (values.name != '' && values.name != null && values.name != undefined) 
    {
        var Previouscustomer = await customer.findOne().sort('-id').lean().exec(); 
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
       let files = req.files;
        console.log(files);
       //image = files.image[0]['filename'];
       //document = files.document[0]['filename'];
        let Data = {
            id : id,
            name: values.name,  
            phonenumber: values.phonenumber,  
            address: values.address,  
            city: values.city,  
            createdAt: new Date(),
            updatedAt: new Date(),
            lastModifiedAt: new Date(),
            LastModifiedBy: '',

        }
        if(files && files.image && files.image.length > 0){
            Data.image = url +files.image[0]['filename'];
        }
        if(files && files.document && files.document.length > 0){
            Data.document = url +files.document[0]['filename'];
        }
        customer(Data).save().then((Result) => { 
            res.send({
                success: true,
                code: 200,
                message: "Customer Added Success ",
                data: Data,
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
});




const Updatecustomer = catchAsync(async (req, res) => {
    let values = req.body;
    var url  = 'https://loanapp-production.herokuapp.com/';
    if(values.id != '' && values.id != null && values.id != undefined){
        let query = {
            id:values.id
        }
        let Data = req.body;
        let files =req.file;
        if(files != '' && files != null && files != undefined )
        {
            Data.image = url + files.filename;
        }
        let changes = {
            $set:Data
        }
       
        customer.updateOne(query, changes, {upsert:true}).lean().exec().then((UpdateStatus) => {
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



// const deletecustomer = catchAsync(async (req, res) => {
//     let values = req.body;
//     let query = 
//     {
//         id:values.id,
//     }
//     let changes = {
//         $set: {
//             status: 1
//         }
//     }
//     customer.updateOne(query, changes, { upsert: true }).lean().exec().then((UpdateStatus) => {
//         console.log(UpdateStatus);
//         res.send({
//             code: 200,
//             success: true,
//             message: "Customer Deleted Success.",
//             timestamp: new Date()
//         })
//     }).catch((err) => {
//         res.send({
//             code: 201,
//             success: false,
//             message: "DATABASE_ERROR.",
//             timestamp: new Date()
//         });
//     })
// }); 
 
const deletecustomer = catchAsync(async (req, res) => {
    let values = req.body;
    let query = values;
    let changes = {
        $set: {
            status: 1
        }
    }
    customer.updateOne(query, changes, { upsert: true }).lean().exec().then((UpdateStatus) => {
        console.log(UpdateStatus);
        res.send({
            code: 200,
            success: true,
            message: "Customer Deleted Success.",
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
    customerdetails,
    addcustomer,
    Updatecustomer,
    deletecustomer
    
};