const request = require('../utils/request');
const logger = require('../utils/logger');
const config = require('config');

const partnerKey = config.get('partnerKey');
const partnerId = config.get('partnerId');


function getPartnersDetails() {
    return request({
        uri: 'https://dev.payconiq.com/v1/partners/' + partnerId,
        headers: {Authorization: partnerKey}
    })
}
//getPartnersDetails().then((res)=> console.log(res))

module.exports = {
    getPartnersDetails
};