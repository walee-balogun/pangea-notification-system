const mongoDbConfig = {
    dbName: process.env.MONGO_DB_NAME || 'notification-system',
    hostname: process.env.MONGO_DB_HOST_NAME || 'cluster0.faclr.mongodb.net',
    host: process.env.MONGO_DB_HOST || '',
    port: process.env.MONGO_DB_PORT || '',
    user: process.env.MONGO_DB_USER || 'wale',
    password: process.env.MONGO_DB_PASSWORD || 'P@33w0rd.123$',
    repl: process.env.MONGO_DB_REPLS || 'rs1',
    servers: (process.env.MONGO_DB_SERVERS) ? process.env.MONGO_DB_SERVERS.split(' ') : [
        'cluster0.faclr.mongodb.net'
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