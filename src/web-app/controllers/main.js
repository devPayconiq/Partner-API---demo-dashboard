const config = require('config');

const partnerId = config.get('partnerId');
const partnerKey = config.get('partnerKey');

function register(app) {
    app.get('/', (req, res) => {
        res.redirect('/welcome.html');
    });

    app.get('/welcome.html', (req, res) => {
        res.render('welcome');
    });
}

module.exports = register;