const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageExchangeSchema = new Schema({
    topic: {
        type: String,

    },
    url: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
});

const MessageExchange = mongoose.model('MessageExchange', MessageExchangeSchema, 'message-exchanges');

module.exports.Schema = MessageExchangeSchema;
module.exports.MessageExchange = MessageExchange;