const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemSchema = new Schema({
    itemname: {type: String, required: true},
    shopname: {type: String, required: true},
    itemimage: String,
    description: String,
    price: Number,
    available_quantity: Number,
    category: String
});

const itemModel = mongoose.model('item', ItemSchema);
module.exports = itemModel;