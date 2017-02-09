const config = require('config');

const app = require('./app');

app.listen(config.app.port, function () {
    console.log('Express listening on port : %s in mode: %s', config.app.port, process.env.NODE_ENV);
    console.log('Starting with config: ', JSON.stringify(config, null, 2));
});
