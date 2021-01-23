const { EventEmitter } = require("events");
const mediator = new EventEmitter();
const ENV = process.env.NODE_ENV || 'development';
const config = require('./config');
const server = require('./config/server');
const mongoose = require('./config/mongoose');


process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
});

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
});


mongoose.connect(config.mongoDbConfig, mediator);


mediator.on('db.ready', () => {
    console.log('---- on db.ready ----')

    server.startExpress({
        config,
        env: ENV,
        root: __dirname
    });

});

mediator.on("db.error", (err) => {
    console.error('---- on db.error ----')

    console.error(err);
})
