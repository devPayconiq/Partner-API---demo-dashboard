const config = require('config');

const clients = require('../../services/clients');

const partnerId = config.get('partnerId');
const partnerKey = config.get('partnerKey');

function register(app) {
    app.get('/show-clients.html', (req, res) => {
        clients.getClientsList().then((clients)=> {
            console.log(typeof clients)
            var jsonClients = JSON.stringify(clients);
            res.render('show-clients', {
                clients
            })
        }).catch((e)=> {
            res.status(500).send(e.stack);
        });
    });

    app.post('/create-client.html', (req, res) => {
        clients.createNewClient(req.body).then((serviceResponse)=> {
            console.log(serviceResponse);
            res.redirect('/show-clients.html');
        }).catch((e)=> {
            res.status(500).send(e.stack);
        });
    });

    app.get('/create-new-client-form.html', (req, res) => {
        res.render('create-new-client-form');
    });
}

module.exports = register;