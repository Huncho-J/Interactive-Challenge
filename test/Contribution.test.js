//load contract artifacts
const ContributionContract = artifacts.require("./Contribution.sol");
const MockToken = artifacts.require("./MockToken.sol");

require("chai")
  .use(require('chai-as-promised'))
  .should()

const truffleAssert = require('truffle-assertions');

//helper function: converts eth to wei
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
        });
  });
//Test for receieve() fallback function
    describe('sendEth()', async () =>{

      let result

      before(async () => {
        result = await contributionContract.sendEth({from:accounts[3], value:web3.utils.toWei('1','ether')})
        })

        it("emits eth recieved event", async () => {
          event = result.logs[0].args
          assert.equal(event.contributor, accounts[3], 'Logs the correct  account')

          //should not accept contribution is MockToken balance is low
         await contributionContract.sendEth({from:accounts[3], value:web3.utils.toWei('5000000','ether')}).should.be.rejected
          });
        });
      //check for successful transfer of mockToken after contribution
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
  })

});
