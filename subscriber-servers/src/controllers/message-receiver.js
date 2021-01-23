const { validationResult } = require('express-validator');

const receiveMessage = (req, res, next) => {

    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.error(errors);

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

    console.log('---- Message Received ----');
    console.log(req.body);
    
    
    res.status(200).json({
        code: 'MSG-RCVR-00',
        status: 'success',
        success: true,
        message: 'Message was successfully received from the publisher',
        data: {
            receivedMessage: req.body
        }
    });
}

module.exports = Object.assign({}, { receiveMessage });