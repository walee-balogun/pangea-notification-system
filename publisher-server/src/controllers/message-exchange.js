const _ = require('lodash');
const MessageExchange = require('../models/message-exchange').MessageExchange;
const MessageQueue = require('../models/message-queue').MessageQueue;
const { validationResult } = require('express-validator');
const axios = require('axios');

const subscribeToTopic = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.error(errors.array());

        let errorHashMap = {};

        for (let error of errors.array()) {

            errorHashMap[error.param] = error.msg;
        }

        return res.status(422).json({
            code: 'SUB-01',
            status: 'fail',
            success: false,
            message: 'Invalid Parameters',
            data: {
                error: errorHashMap
            }
        });

    }

    let messageExchangeData = _.pick(req.body, ['url']);
    messageExchangeData.topic = req.params.topic;

    try {
        
        let createdMessageExchange = await MessageExchange.create(messageExchangeData);

        res.status(201).json({
            url: createdMessageExchange.url,
            topic: createdMessageExchange.topic
        });

    } catch (err) {
       
        console.error(err);

        res.status(404).json({
            code: 'SUB-99',
            status: 'error',
            success: false,
            message: 'Unable to subscribe to topic',
            data: {
                error: err
            }
        });
    }
    
}

const publishToTopic = async(req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.error(errors);

        let errorHashMap = {};

        for (let error of errors.array()) {

            errorHashMap[error.param] = error.msg;
        }

        return res.status(422).json({
            code: 'PUB-MSG-SUB-01',
            status: 'fail',
            success: false,
            message: 'Invalid Parameters',
            data: {
                error: errorHashMap
            }
        });

    }

    let messageQueueData = {};
    messageQueueData.message = req.body;

    try {

        let messageExchanges = await MessageExchange.find({ topic: req.params.topic }, { createdAt: 0, updatedAt: 0});
        let publishedMessage;
        for (let messageExchange of messageExchanges) {
           
            messageQueueData.messageExchange = messageExchange._id;
            messageQueueData.isPublished = true;
    
            publishedMessage = await MessageQueue.create(messageQueueData);
        
            await axios.post(messageExchange.url, {
                topic: req.params.topic,
                data: req.body
            });

            publishedMessage.isDelivered = true;
            publishedMessage.isAcknowledged = true;
             
            await publishedMessage.save();

        }

        
        res.status(200).json({
            code: 'PUB-MSG-SUB-00',
            status: 'success',
            success: true,
            message: 'Message was successfully published to the subscriber(s)',
            data: {
                publishedMessage: publishedMessage
            }
        });
    } catch (err) {

        console.error(err);

        res.status(404).json({
            code: 'PUB-MSG-SUB-99',
            status: 'error',
            success: false,
            message: 'Unable to publish message to the subscriber(s)',
            data: {
                error: {
                    code: err.code ? err.code : null,
                    message: err.message
                }
            }
        });
    }
}

module.exports = Object.assign({}, { subscribeToTopic, publishToTopic })

