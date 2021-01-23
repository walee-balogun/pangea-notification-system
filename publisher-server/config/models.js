const init = (app) => {

    let modelsPath = `${app.get('root')}/src/models/`;

    for (let model of  ['message-exchange', 'message-queue']) {

        require(modelsPath + model);
    }
};

module.exports = Object.assign({}, { init });