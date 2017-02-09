var fs = require('fs');
var ursa = require('ursa');

var signer = ursa.createSigner("sha256");
var privateKey = ursa.createPrivateKey(fs.readFileSync('src/resources/private-key-path/private.pem'));

function sign(content) {
    signer.update(content, "utf8");
    const signature = signer.sign(privateKey, "base64");
    return signature;
}

module.exports = {
    sign
};