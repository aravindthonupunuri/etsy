const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var cartSchema = new Schema({
    itemid: {type: mongoose.Types.ObjectId, required: true},
    userid: {type: mongoose.Types.ObjectId, required: true},
    quantity: {type: String, required: true},
    shopname: {type: String, required: true}
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;