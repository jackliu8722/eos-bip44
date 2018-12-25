var assert = require("assert")
const ecc = require('eosjs-ecc')
var Mnemonic = require('bitcore-mnemonic');


var EOSBIP44 = function(hdKey) {

    this.parts = [
        `44'`, // bip 44
        `194'`,  // coin
        `0'`,  // wallet
        `0`    // 0 - public, 1 = private
        // index
    ];

    assert(hdKey);

    this.key = hdKey;
}

EOSBIP44.fromPublicSeed = function(seed) {
    return new EOSBIP44(new HDPublicKey(seed));
}

EOSBIP44.fromPrivateSeed = function(seed) {
    return new EOSBIP44(new HDPrivateKey(seed));
}

EOSBIP44.fromMnemonic = function(wordslist) {
    var mn = new Mnemonic(str)
    var key = mn.toHDPrivateKey()
    return new EOSBIP44(key);
}

EOSBIP44.prototype.derive = function(path) {
    return this.key.derive(path);
}

EOSBIP44.prototype.getPublickey = function(index) {

    let path = this.parts.slice(this.key.depth);
    let derived = this.key.derive('m/' + (path.length > 0 ? path.join('/') + '/' : "") + index);

    seed = derived.privateKey.toBuffer().toString('hex')
    priv = ecc.seedPrivate(seed)
    return  ecc.privateToPublic(priv)
}

EOSBIP44.prototype.getPrivateKey = function(index) {
    let path = this.parts.slice(this.key.depth);
    let derived = this.key.derive('m/' + (path.length > 0 ? path.join('/') + '/' : "") + index);
    seed = derived.privateKey.toBuffer().toString('hex')
    return ecc.seedPrivate(seed)
}

module.exports = EOSBIP44
