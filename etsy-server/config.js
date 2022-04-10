// const config = {
    const mongoDB = 'mongodb+srv://EtsyDb:aravind1234@etsycluster.4fknc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// };
const mongoose = require('mongoose');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
  };

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
  });

module.exports = mongoose;