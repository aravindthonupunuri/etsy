const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ShopSchema = new Schema({
    shopname: {type: String, required: true},
    shopownerId: {type: mongoose.Types.ObjectId, required: true},
    shopimage: String,
    salescount: Number
});

const shopModel = mongoose.model('shop', ShopSchema);
module.exports = shopModel;