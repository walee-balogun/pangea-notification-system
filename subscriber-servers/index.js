const ENV = process.env.NODE_ENV || 'development';
const config = require('./config');
const server = require('./config/server');


process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
});

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
});


server.startExpress({
    config,
    env: ENV,
    root: __dirname
});

