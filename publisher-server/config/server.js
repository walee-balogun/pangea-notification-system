const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');
const moment = require('moment-timezone');
const http = require('http');


const getMongoURL = (config) => {

    let uri = '';
    if (config.port) {
        uri = `mongodb+srv://${config.user}:${encodeURIComponent(config.password)}@${config.host}:${config.port}/${config.dbName}`;

    } else {
        uri = `mongodb+srv://${config.user}:${encodeURIComponent(config.password)}@${config.hostname}/${config.dbName}?retryWrites=true&w=majority`;

    }
    
    return uri;
}

const startExpress = (options) => {

    const { config, root, env } = options;

    const app = express();

    app.set('root', root);
    app.set('env', env);

    moment.tz.setDefault("Africa/Lagos");
    
    const sessionOpts = {
        secret: config.serverConfig.session.secret,
        key: 'skey.sid',
        resave: config.serverConfig.session.resave,
        saveUninitialized: config.serverConfig.session.saveUninitialized
    };

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.disable('x-powered-by');

    if (config.serverConfig.session.type === 'mongo') {
        sessionOpts.store = new MongoStore({
            url: getMongoURL(config.mongoDbConfig)
        });
    }

    app.use(session(sessionOpts));

    app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

        next();
    });


    require('./models').init(app);
    require('./routes').init(app);


    const server = http.createServer(app);

    server.listen(
        config.serverConfig.port,
        config.serverConfig.host,
        () => {
            console.log(`${config.serverConfig.name} is running`);
            console.log(`   listening on port: ${config.serverConfig.port}`);
            console.log(`   environment: ${env.toLowerCase()}`);
        }
    );
    
    return { app, server };
}

module.exports = Object.assign({}, {startExpress})
