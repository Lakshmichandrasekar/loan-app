var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applyloandetails = new Schema({
    id: { type: Number, default: "", required:true},
    user_id: { type: Number, default: "", required:true},  
    cust_id: { type: Number, default: "", required:true},  
    loan_id: { type: Number, default: "", required:true},  
    amount: { type: Number, default: "", required:true},  
    date: { type: Date, default: new Date(), required:true},  
    createdBy: { type: String, default: new Date(), required:false},
    status :{type :Number,default: 0, required:false},
    updatedBy: { type: String, default: new Date(), required:false},
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
)
module.exports = mongoose.model('collection', applyloandetails);

 
