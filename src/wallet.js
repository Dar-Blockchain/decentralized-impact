const ethers = require('ethers')
exports.wallet = async () => {
    const wallet = ethers.Wallet.createRandom();
    console.log('address:', wallet.address)
    console.log('mnemonic:', wallet.mnemonic.phrase.toString())
    console.log('privateKey:', wallet.privateKey)
    return wallet;
  }

