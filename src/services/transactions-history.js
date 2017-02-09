const request = require('../utils/request');
const logger = require('../utils/logger');
const config = require('config');

const partnerKey = config.get('partnerKey');
const partnerId = config.get('partnerId');

function getAllTransactions() {
    return request({
        method: 'POST',
        uri: `https://dev.payconiq.com/v1/partners/${partnerId}/transactions/search?offset=0&limit=100`,
        headers: {Authorization: partnerKey},
        body: {
            "from": "2016-04-01T19:26:21.305Z",
            "to": "2017-05-31T19:26:21.305Z"
        },
        json: true
    })
}

function getTransactionsDateFilter() {
    return request({
        method: 'POST',
        uri: `https://dev.payconiq.com/v1/partners/${partnerId}/transactions/search?offset=0&limit=100`,
        headers: {Authorization: partnerKey},
        body: {
            "from": "2016-04-01T19:26:21.305Z",
            "to": "2017-05-31T19:26:21.305Z"
        },
        json: true
    })
}

function getTransactionDetails(transactionId) {
    return request({
        uri: `https://dev.payconiq.com/v1/partners/${partnerId}/transactions/${transactionId}`,
        headers: {Authorization: partnerKey}
    })
}

function getTransactionDetailsWithURL(url) {
    return request({
        uri: url.replace('http', 'https'),
        headers: {Authorization: partnerKey}
    })
}

module.exports = {
    getAllTransactions,
    getTransactionDetails,
    getTransactionsDateFilter,
    getTransactionDetailsWithURL
};