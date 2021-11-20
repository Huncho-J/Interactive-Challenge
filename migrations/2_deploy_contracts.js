const MockToken = artifacts.require("./MockToken.sol");
const ContributionContract = artifacts.require("./MockToken.sol");

module.exports = function (deployer) {
  //deploy token contract
  deployer.deploy(MockToken);
  const mockTokenContract = await MockToken.deployed();

  //deploy ContributionContract
  deployer.deploy(ContributionContract);
  const contributionContract = await ContributionContract.deployed(mockTokenContract.address);

  await mockTokenContract.transfer(contributionContract.address, ('1000'))

};
