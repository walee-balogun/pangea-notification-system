const express = require('express');
const router = express.Router();
const msgExchCtrl = require('../controllers/message-exchange');
const { body } = require('express-validator');

router.post('/subscribe/:topic', [
    body('url').not().isEmpty().trim()
], msgExchCtrl.subscribeToTopic);

router.post('/publish/:topic', [
    body('*').not().isEmpty().trim()
], msgExchCtrl.publishToTopic);

module.exports = router;