var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    id: { type: Number, default: "", required:false},
    name: { type: String, default: "", required:true},
    phonenumber: { type: String, default: "", required:true},
    address: { type: String, default: "", required:true},
    image: { type: String, default: "", required:false}, 
    document: { type: String, default: "", required:false}, 
    city :{type :Number,default: "", required:true},
    status :{type :Number,default: 0, required:false},
    createdAt: { type: Date, default: "", required:false},
    updatedAt: { type: Date, default: new Date(), required:false},
    lastModifiedAt: { type: Date, default: new Date(), required:false},
    LastModifiedBy: { type: String, default: "", required:false},
}, 
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
)

module.exports = mongoose.model('Customer', customerSchema);