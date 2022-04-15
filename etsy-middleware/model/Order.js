const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var orderSchema = new Schema({    
    userid: {type: mongoose.Types.ObjectId, required: true},
    total: {type: Number, required: true},
    createdtime: Date
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;