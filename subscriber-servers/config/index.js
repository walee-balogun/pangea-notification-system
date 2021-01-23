
const ENV = process.env.NODE_ENV || 'development';

const  { serverConfig } = require('./environments/'+ENV.toLowerCase());


module.exports = Object.assign({}, { serverConfig });