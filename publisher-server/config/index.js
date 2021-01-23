
const ENV = process.env.NODE_ENV || 'development';

const  { mongoDbConfig, serverConfig } = require('./environments/'+ENV.toLowerCase());


module.exports = Object.assign({}, { mongoDbConfig, serverConfig });