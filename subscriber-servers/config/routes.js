const init = (app) => {

    let routesPath = `${app.get('root')}/src/routes`;

    app.use('/', require(`${routesPath}/message-receivers`));

}

module.exports = Object.assign({}, { init });