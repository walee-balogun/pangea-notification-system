const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const moment = require('moment-timezone');
const http = require('http');


const startExpress = (options) => {

    const { config, root, env } = options;

    const app = express();

    app.set('root', root);
    app.set('env', env);

    moment.tz.setDefault("Africa/Lagos");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.disable('x-powered-by');

    app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

        next();
    });


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
