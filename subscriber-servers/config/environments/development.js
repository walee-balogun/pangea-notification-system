const serverConfig = {
    name: "Pangea Subscriber Server",
    port: process.env.PORT || 9000,
    hostname: process.env.HOST_NAME || 'localhost',
    host: process.env.HOST || '0.0.0.0',
    baseUrl: 'http://localhost:9000',
    jwtSecret: '',
    serverStatic: true,
    session: {
        type: 'mongo',
        secret: 'someVeRyN1c3S#cr3tHer34U',
        resave: false,
        saveUninitialized: true
    }
};

module.exports = Object.assign({}, { serverConfig });