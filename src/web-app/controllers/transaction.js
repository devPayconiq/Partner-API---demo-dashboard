const config = require('config');

const transactionsHistory = require('../../services/transactions-history');
const transactionP2P = require('../../services/p2p-transactions');
const transactionSDD = require('../../services/sdd-transactions');
const transactionSCT = require('../../services/sct-transactions');

const partnerId = config.get('partnerId');
const partnerKey = config.get('partnerKey');

function register(app) {
    app.get('/transaction-history.html', (req, res) => {
        transactionsHistory.getAllTransactions().then((transactions)=> {
            res.render('transaction-history', {
                transactions
            })
        }).catch((e)=> {
            res.status(500).send(e.stack);
        });
    });

    app.get('/transaction-history-filter.html', (req, res) => {
        transactionsHistory.getAllTransactions().then((transactions)=> {
            res.render('transaction-history', {
                transactions
            })
        }).catch((e)=> {
            res.status(500).send(e.stack);
        });
    });

    app.get('/create-transaction-p2p.html', (req, res) => {
        res.render('create-transaction-p2p-form');
    });
    app.get('/create-transaction-sdd.html', (req, res) => {
        res.render('create-transaction-sdd-form');
    });
    app.get('/create-transaction-sct.html', (req, res) => {
        res.render('create-transaction-sct-form');
    });

    app.post('/create-transaction-P2P.html', (req, res) => {
        transactionP2P.createP2PTransaction(req.body).then((location)=> {
            return transactionsHistory.getTransactionDetailsWithURL(location);
        }).then((transactionDetails) => {
            res.render('transaction-details', {
                transactionDetails
            });
        }).catch((e)=> {
            res.status(500).send(e.stack);
        });
    });

    app.post('/create-transaction-SDD.html', (req, res) => {
        transactionSDD.createSDDTransaction(req.body).then((location)=> {
            return transactionsHistory.getTransactionDetailsWithURL(location);
        }).then((transactionDetails) => {
            res.render('transaction-details', {
                transactionDetails
            });
        }).catch((e)=> {
            res.status(500).send(e.stack);
        });
    });

    app.post('/create-transaction-SCT.html', (req, res) => {
        transactionSCT.createSCTTransaction(req.body).then((location)=> {
            return transactionsHistory.getTransactionDetailsWithURL(location);
        }).then((transactionDetails) => {
            res.render('transaction-details', {
                transactionDetails
            });
        }).catch((e)=> {
            res.status(500).send(e.stack);
        });
    });

}

module.exports = register;