const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var orderItemSchema = new Schema({    
    orderid: {type: mongoose.Types.ObjectId, required: true},
    itemid: {type: mongoose.Types.ObjectId, required: true},
    price: {type: String},
    quantity: {type: String},
    shopname: String,
    createdtime: Date
});

const orderItemModel = mongoose.model('orderItem', orderItemSchema);
module.exports = orderItemModel;