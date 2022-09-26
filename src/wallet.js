const ethers = require('ethers')
exports.wallet = async () => {
    const wallet = ethers.Wallet.createRandom();
    return wallet;
  }

