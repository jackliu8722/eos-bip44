# eos-bip44
Library to generate eos public key from a hierarchical deterministic wallet according to the BIP44 standard.

## Get started
This library is distributed in both the npm packaging systems.

```sh
npm install eos-bip44
```

## Example

```sh

var EOSBIP44 = require("eos-bip44")

var wordlist= "job wolf wave share jacket giant cruise hand year pistol brave flush"

var eos = EOSBIP44.fromMnemonic(wordlist)

var privateKey = eos.getPrivateKey(1)
var publicKey = eos.getPublickey(1)

console.log("privateKey:" + privateKey)
console.log("publicKey :" + publicKey)

```