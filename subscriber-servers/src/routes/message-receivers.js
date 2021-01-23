const express = require('express');
const router = express.Router();
const messageReceiverCtrl = require('../controllers/message-receiver');
const { body } = require('express-validator');

router.post('/test1', [
    body('*').not().isEmpty().trim()
], messageReceiverCtrl.receiveMessage);

router.post('/test2', [
    body('*').not().isEmpty().trim()
], messageReceiverCtrl.receiveMessage);

module.exports = router;