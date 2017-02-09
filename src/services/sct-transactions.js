const config = require('config');

const request = require('../utils/request');
const logger = require('../utils/logger');
const signer = require('../utils/signer');

const partnerKey = config.get('partnerKey');
const partnerId = config.get('partnerId');

function createSCTTransaction(transaction) {
    const generatedSignature = signSCT(transaction);
    return request({
        method: 'POST',
        uri: `https://dev.payconiq.com/v1/partners/${partnerId}/transactions`,
        headers: {Authorization: partnerKey},
        body: {
            "originId": transaction.originId,
            "originIBAN": transaction.originIBAN,
            "targetId": transaction.targetId,
            "targetIBAN": transaction.targetIBAN,
            "amount": transaction.amount,
            "currency": transaction.currency,
            "signature": generatedSignature
        },
        json: true
    })
}

function signSCT(transaction) {
    const transactionSignature = partnerId + transaction.originId + transaction.originIBAN + transaction.targetId + transaction.targetIBAN + transaction.amount + transaction.currency;
    return signer.sign(transactionSignature);
}

module.exports = {
    createSCTTransaction
};