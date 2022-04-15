const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouritesSchema = new Schema({
    itemId: {type: mongoose.Types.ObjectId, required: true},
    userId: {type: mongoose.Types.ObjectId, required: true}
});

const favouriteModel = mongoose.model('favourite', favouritesSchema);
module.exports = favouriteModel;