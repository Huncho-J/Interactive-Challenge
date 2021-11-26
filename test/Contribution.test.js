//load contract artifacts
const ContributionContract = artifacts.require("./Contribution.sol");
const MockToken = artifacts.require("./MockToken.sol");

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

function tokens(n){
  return web3.utils.toWei(n, 'ether');
}
//initialize test for contribution.sol
contract('Contribution', function(accounts){

// build up new contracts before each test
  let contributionContract, mockToken, result

  before(async () => {
    mockToken = await MockToken.deployed()
    contributionContract = await ContributionContract.deployed(mockToken.address)
    res = await contributionContract.sendEth({from:accounts[2], value:web3.utils.toWei('2','ether')})
    })

//check for successful deployment
  describe('deployment', async() => {
//check for contribution contract address
    it('deploys succesfully', async () => {
      const address = await contributionContract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
//check for contribution contract has access to MockToken Contract
    it('it has MockTokenContract', async () =>{
      mockTokenAddress = await contributionContract.tokenContract();
      assert.equal(mockToken.address, mockTokenAddress)
      //has tokens
      const tokenBalance = await mockToken.balanceOf(contributionContract.address)
      console.log(tokenBalance.toString(), tokens('100000'))
    });
  });
//Test for receieve() fallback function
    describe('recieve()', async () =>{
      })
      //test for failed transaction. Not enough tokens in contract
    //   it("should not be able to send more than the availble token balance", async () => {
    //     await truffleAssert.reverts(
    //       web3.eth.sendTransaction({
    //         from: accounts[2],
    //         to: contributionContract.address,
    //         value:'5000000000'
    //       }),
    //         "Not enough tokens in contract"
    //     );
    // });
    //check for successful transfer after donation
    it('transfers tokens to contributor', async () =>{
      const contributorBal =  await mockToken.balanceOf(accounts[2])
      assert.equal(contributorBal.toString(), tokens('4'))
    })
    describe('checkTotalContribution()', async () =>{
      //test for failed transaction. Not enough tokens in contract
      it("logs users contribution", async () => {
        const ethContribution = await contributionContract.checkTotalContribution.call(accounts[2], {from:accounts[1]})
        assert.equal(ethContribution.toString(), tokens('2'))
    });
    it("emits events", async () => {
      const event = res.log[0].args
      assert.equal(event.contributor, accounts[2], 'Logs the correct  account')
      });
    });

});
