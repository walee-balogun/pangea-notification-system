const mongoose = require('mongoose');


const getMongoURL = (config) => {

    let uri = '';
    if (config.port) {
        uri = `mongodb+srv://${config.user}:${encodeURIComponent(config.password)}@${config.host}:${config.port}/${config.dbName}`;

    } else {
        uri = `mongodb+srv://${config.user}:${encodeURIComponent(config.password)}@${config.hostname}/${config.dbName}?retryWrites=true&w=majority`;

    }
    
    return uri;
}

const connect = async (mongodbConfig, mediator) => {

    if (!mongodbConfig) {

        throw new Error("Mongo DB Connection config not supplied!");
    }

    var mongoDbUri = getMongoURL(mongodbConfig);

    try {

        await mongoose.connect(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true });

        mediator.emit('db.ready');

    } catch (err) {

        console.error('--- mongodb connection err ---');
        console.error(err);

        mediator.emit('db.error', err);

        throw err;
    }

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('SIGHUP', cleanup);


    return mongoose;
};

function cleanup() {
    mongoose.connection.close(function () {
        console.log('Closing DB connections and stopping the app. Bye bye.');
        process.exit(0);
    });
}

module.exports = Object.assign({}, { connect });
