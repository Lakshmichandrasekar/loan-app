 
const catchAsync = require('../utils/catchAsync'); 

var city = require('../models/city'); 

const addcity = catchAsync(async (req, res) => {
    let values = req.body; 
    if (values.name != '' && values.name != null && values.name != undefined) 
    {
       
        var Previouscity = await city.findOne().sort('-id').lean().exec(); 
        
       
        let id = 1;
        if(Previouscity.hasOwnProperty('id')){
            id = Previouscity.id + 1;
        }else{
            id = id;
        }
        
        let Data = {
            id : id, 
            name: values.name,  

        }
        city(Data).save().then((Result) => { 
            res.send({
                success: true,
                code: 200,
                message: "City Added Success ",
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

const citydetails = catchAsync(async (req, res) => {
    let query = {}
    city.find().lean().exec().then((Result) => {
        if (Result && Result.length > 0) {
            var newdata = new Array();
            for(let i=0; i<Result.length; i++ )
            {
                let Data =  {
                    "id" : Result[i].id,
                    "name" : Result[i].name,
                };
                newdata.push(Data);
            }
            res.send({
                code: 200,
                success: true,
                message: "Data Retrieved Success.",
                data: newdata,
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

///////////////
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
} 

module.exports = {
    citydetails,
    addcity
};