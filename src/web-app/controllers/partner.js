const partners = require('../../services/partners');
const config = require('config');

const partnerId = config.get('partnerId');
const partnerKey = config.get('partnerKey');

function register(app) {
    app.get('/my-details.html', (req, res) => {
        partners.getPartnersDetails().then((partnersDetails)=> {
            res.render('my-details', {
                partnerId,
                partnerKey,
                partnersDetails
            })
        }).catch((e)=> {
            res.status(500).send(e.stack);
        });
    });
}

module.exports = register;