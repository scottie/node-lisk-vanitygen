/*
    ONZ Vanity Address - Scottie
    https://github.com/scottie/onz-vanity-gen
*/
//'use strict';
const bip39 = require('bip39');
const crypto = require('crypto');
const onz = require('onz-js');

const noop = function() {};

function time(s) {
    return new Date(s * 1e3).toISOString().slice(-13, -5);
}

function ONZVanitygen(config) {
    console.log("ONZ Vanity Gen Initiated");
    if (typeof config !== 'object') {
        throw new Error('Config must be an object.');
    }

    if (!config.pattern) {
        throw new Error('config.pattern must be specifed.');
    }

    let newConfig = {};
    let tempPattern;

    //if (typeof config.pattern === 'number') {
    tempPattern = [config.pattern];
    //} else if (config.pattern instanceof Array) {
    //    tempPattern = config.pattern;
    //} else {
    //    throw new Error('config.pattern must be array or number/letter.');
    //}

    //tempPattern = tempPattern
    //    .filter((a) => Number.isInteger(a))
    //    .sort((a, b) => b - a);

    if (!tempPattern.length) {
        throw new Error('config.pattern must be array with at least one number or letter.');
    }

    newConfig.pattern = tempPattern;
    newConfig.continue = typeof config.continue !== 'undefined' ? !!config.continue : true;
    newConfig.messageInterval = typeof config.messageInterval === 'number' ? config.messageInterval : 1000;

    this.config = newConfig;
}

ONZVanitygen.prototype.generateONZPair = function(passphrase) {
    if (!passphrase) {
        passphrase = bip39.generateMnemonic();
    }

 
    var ONZ = onz.api({testnet:true});

    //console.log("Generating Keys: " + passphrase);
    var keys = onz.crypto.getKeys(passphrase);
    var address = onz.crypto.getAddress(keys.publicKey);
    /*
    function getAddress(publicKey) {
        var publicKeyHash = crypto.createHash('sha256').update(publicKey, 'hex').digest();
        var buffer = new Buffer(new RIPEMD160().update(publicKeyHash).digest('hex'));
        var payload = new Buffer(21);
        payload.writeUInt8(81, 0);
        buffer.copy(payload, 1);
        var addr = 'ON'+bs58check.encode(payload);
        if(this.config.debugMode){
            console.log(addr);
        }
        
        return addr;
    }
   */
  //console.log("Address: " + address);
    return {
        passphrase,
        address: address,//getAddress(publicKey),
    }
}

ONZVanitygen.prototype.log = function(string){
        var logtime = Math.floor(new Date() / 1000);
        process.stdout.write("\033[36;1;4m[ONZ " + time(logtime) + "]\033[0m" + "\033[37;0m " + "\033[33;1;4m[" + "ONZ" + "]\033[0m " + string + '\n \033[0m'); 
}

ONZVanitygen.prototype.run = function(foundCallback, statusCallback) {
    if (typeof foundCallback !== 'function') {
        throw new Error('Found callback must be a function.');
    }

    if (typeof statusCallback !== 'function') {
        statusCallback = noop;
    }

    const startTime = new Date().valueOf();

    let found = false;
    let foundCount = 0;
    let count = 1;
    let lastMessage = 0;

    do {
        let generated = this.generateONZPair();
        let singleStartTime = new Date().valueOf();

        if (singleStartTime - startTime > 1000 && singleStartTime - lastMessage >= this.config.messageInterval) {
            let time = parseInt((singleStartTime - startTime) / 1000);
            statusCallback({
                count,
                time,
                avg: parseFloat((count / time).toFixed(2)),
                foundCount
            });

            lastMessage = singleStartTime;
        }

        found = this.config.pattern.find((a) => generated.address.indexOf(a) === 0);

        if (found) {
            foundCallback({
                count,
                pattern: found,
                address: generated.address,
                passphrase: generated.passphrase
            });

            foundCount++;
        }

        count++;
    }
    while (this.config.continue || !found);

    return this;
};

console.log = function(string){
    ONZVanitygen.prototype.log(string);
}

module.exports = ONZVanitygen;
