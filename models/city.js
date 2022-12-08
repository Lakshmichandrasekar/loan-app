var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
    id: { type: Number, default: "", required:true},
    name: { type: String, default: "", required:true},
    status: { type: Number, default: 0, required:false},  //0 active, 1 inactive
    createdBy: { type: String, default: new Date(), required:false},
    updatedBy: { type: String, default: new Date(), required:false},
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}
)
module.exports = mongoose.model('city', citySchema);

