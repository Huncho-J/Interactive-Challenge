const MockToken = artifacts.require("./MockToken.sol");

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

//initialize test for contribution.sol
contract('MockToken', function(accounts){

// build up new contracts before each test
  let mockToken, res

  before(async () => {
    mockToken = await MockToken.deployed()
    res = await mockToken.pause({from:accounts[0]})
  })

//check for successful deployment
  describe('deployment', async() => {
//check for contribution contract address
    it('deploys succesfully', async () => {
      const address = await mockToken.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
    it('Check paused contract', async () => {
      event = res.logs[0].args
      assert.equal(event.status,true, 'Logs the correct status: Paused')
    })

    it('Check unpaused contract', async () => {
      res = await mockToken.unpause({from:accounts[0]})
      event = res.logs[0].args
      assert.equal(event.status,false, 'Logs the correct status: unPaused')
    })

})
})
