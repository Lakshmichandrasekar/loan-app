var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applynowSchema = new Schema({
    id: { type: Number, default: "", required:true}, 
    customer_id: { type: Number, default: "", required:true},
    loan_type:  { type: Number, default: "", required:true},
    amount:  { type: Number, default: "", required:true}, 
    period:  { type: Number, default: "", required:true}, 
    interest:  { type: Number, default: "", required:false}, 
    loan_no: { type: String, default: "", required:true},
    date : {type:Date, default: "", required:true},
    amount_paid:  { type: Number, default: "", required:true},
    payment_status:  { type: Number, default: 0, required:true},  
    application_status:  { type: Number, default: 0, required:true},  
    createdBy: { type: String, default: new Date(), required:false},
    updatedBy: { type: String, default: new Date(), required:false},
}, 
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
)
module.exports = mongoose.model('loan_header', applynowSchema);

 
