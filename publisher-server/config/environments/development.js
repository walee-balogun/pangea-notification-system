const mongoDbConfig = {
    dbName: process.env.MONGO_DB_NAME || 'notification-system',
    hostname: process.env.MONGO_DB_HOST_NAME || 'localhost',
    host: process.env.MONGO_DB_HOST || '127.0.0.1',
    port: process.env.MONGO_DB_PORT || '27017',
    user: process.env.MONGO_DB_USER || 'wale',
    password: process.env.MONGO_DB_PASSWORD || 'password',
    repl: process.env.MONGO_DB_REPLS || 'rs1',
    servers: (process.env.MONGO_DB_SERVERS) ? process.env.MONGO_DB_SERVERS.split(' ') : [
        '127.0.0.1'
    ],
};

const serverConfig = {
    name: "Pangea Publisher Server",
    port: process.env.PORT || 8000,
    hostname: process.env.HOST_NAME || 'localhost',
    host: process.env.HOST || '0.0.0.0',
    baseUrl: 'http://localhost:8000',
    jwtSecret: '',
    serverStatic: true,
    session: {
        type: 'mongo',
        secret: 'someVeRyN1c3S#cr3tHer34U',
        resave: false,
        saveUninitialized: true
    }
};

module.exports = Object.assign({}, { mongoDbConfig, serverConfig });