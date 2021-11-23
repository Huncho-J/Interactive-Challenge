const MockToken = artifacts.require("./MockToken.sol");
const ContributionContract = artifacts.require("./Contribution.sol");
const Web3 = require('web3');

module.exports = async  function (deployer) {
  //load preset accounts from Ganache
  const accounts = await web3.eth.getAccounts();
  //deploy token contract
  await deployer.deploy(MockToken,"uint startTime ", "uint endTime");
  const mockTokenContract = await MockToken.deployed();

  //deploy ContributionContract
  await deployer.deploy(ContributionContract,mockTokenContract.address);
  const contributionContract = await ContributionContract.deployed();

//transfer tokens to contribution contract
  await mockTokenContract.transfer(contributionContract.address, 1000)
//send some ether using account 2
  await web3.eth.sendTransaction({
    from: accounts[1],
    to: contributionContract.address,
    value:'2'
  })

};
