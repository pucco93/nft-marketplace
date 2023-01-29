const WineNFT = artifacts.require('WineNFT');

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts();
  await deployer.deploy(
    WineNFT, 
    'Wine NFTs', 
    'WNR', 10, accounts[1]
  );
};