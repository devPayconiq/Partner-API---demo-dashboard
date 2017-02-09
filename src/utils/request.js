const req = require('request');

const logger = require('./logger');

function request(opts) {
    logger.debug(`Calling ${opts.uri} with options: ${JSON.stringify(opts)}`);
    return new Promise((resolve, reject) => {
        req(opts, (error, response, body)=> {
            if (error) {
                logger.error(`Calling ${opts.uri} failed with error: ${JSON.stringify(error)}`);
                reject(error)
            }
            const statusCode = response.statusCode;
            if (parseInt(statusCode) > 399) {
                logger.error(`Calling ${opts.uri} failed with status code: ${JSON.stringify(statusCode)}`);
                reject(`Failed with http status code ${statusCode}`)
            }
            let parsedResponse = null;
            try {
                parsedResponse = JSON.parse(body)
            } catch (e) {
                parsedResponse = body
            }
            let msg = `Calling ${opts.uri} return succesfully with data: ${JSON.stringify(parsedResponse)}`
            const location = response.headers.location
            if (location) {
                msg += ` and with location header: ${location}`
            }
            if (location && !parsedResponse) {
                parsedResponse = location
            }
            logger.debug(msg);
            resolve(parsedResponse);

        })
    })

    //.then((res)=> {
    //    logger.debug(`Calling ${opts.uri} return succesfully with data: ${JSON.stringify(res)}`);
    //    let parsedResponse = null
    //    try {
    //        parsedResponse = JSON.parse(res)
    //    } catch (e) {
    //        parsedResponse = res
    //    }
    //    return parsedResponse
    //})
    //.catch((err)=> {
    //    logger.error(`Calling ${opts.uri} failed with error: ${JSON.stringify(err)}`);
    //    throw err
    //});
}

module.exports = request;