const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageQueueSchema = new Schema({
    messageExchange: {
        type: Schema.Types.ObjectId,
        ref: 'MessageExchange'
    },
    message: {
        type: Schema.Types.Mixed
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    isAcknowledged: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

const MessageQueue = mongoose.model('MessageQueue', MessageQueueSchema, 'message-queues');

module.exports.Schema = MessageQueueSchema;
module.exports.MessageQueue = MessageQueue;