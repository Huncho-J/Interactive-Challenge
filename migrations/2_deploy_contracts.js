const MockToken = artifacts.require("./MockToken.sol");
const ContributionContract = artifacts.require("./Contribution.sol");
const Web3 = require('web3');

function tokens(n){
  return web3.utils.toWei(n, 'ether');
}
module.exports = async  function (deployer) {
  //load preset accounts from Ganache
  const accounts = await web3.eth.getAccounts();
  //deploy token contract
  await deployer.deploy(MockToken,1637613758, 1637614058);
  const mockTokenContract = await MockToken.deployed();

  //deploy ContributionContract
  await deployer.deploy(ContributionContract,mockTokenContract.address);
  const contributionContract = await ContributionContract.deployed();

//transfer tokens to contribution contract
  await mockTokenContract.transfer(contributionContract.address, tokens('100000'))
//send some ether using account 2

};
