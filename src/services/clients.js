const request = require('../utils/request');
const logger = require('../utils/logger');
const config = require('config');

const partnerKey = config.get('partnerKey');
const partnerId = config.get('partnerId');

function getClientsList() {
    return request({
        method: 'POST',
        uri: 'https://dev.payconiq.com/v1/partners/' + partnerId + '/customers/search?offset=0&limit=100',
        headers: {Authorization: partnerKey},
        body: {
            some: 'payload'
        },
        json: true
    })
}

function createNewClient(customer) {
    return request({
        method: 'POST',
        uri: 'https://dev.payconiq.com/v1/partners/' + partnerId + '/customers',
        headers: {Authorization: partnerKey},
        body: {
            "firstName": customer.firstName,
            "lastName": customer.lastName,
            "phone": customer.phone,
            "email": customer.email,
            "address": {
                "street": customer.street,
                "no": customer.no,
                "postalCode": customer.postalCode,
                "city": customer.city,
                "country": customer.country
            },
            "bankAccounts": [
                {
                    "IBAN": customer.IBAN,
                    "name": customer.name,
                    "mandateReference": customer.mandateReference,
                    "mandateSignDate": customer.mandateSignDate
                }
            ]
        },
        json: true
    })
}

module.exports = {
    getClientsList,
    createNewClient
};