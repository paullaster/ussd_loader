const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema({

});
const userTransaction = mongoose.model("userTransaction", transactionSchema );
module.exports = userTransaction;