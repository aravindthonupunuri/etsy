const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var orderItemSchema = new Schema({    
    orderid: {type: mongoose.Types.ObjectId, required: true, ref: 'order'},
    itemid: {type: mongoose.Types.ObjectId, required: true, ref: 'item'},
    price: {type: String},
    quantity: {type: String},
    message: {type: String},
    shopname: String,
    createdtime: Date
});

const orderItemModel = mongoose.model('orderItem', orderItemSchema);
module.exports = orderItemModel;