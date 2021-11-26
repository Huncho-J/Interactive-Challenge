const MockToken = artifacts.require("./MockToken.sol");

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

//initialize test for contribution.sol
contract('MockToken', function(accounts){

// build up new contracts before each test
  let mockToken

  beforeEach(async () => {
    mockToken = await MockToken.deployed()
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
    // it('is paused', async () => {
    //    await mockToken.pause.call()
    //    const status = await mockToken.paused()
    //   assert.equal(status, true)
    // })
    //
    // it('is unpaused', async () => {
    //   await mockToken.unpause.call()
    //   const status = await mockToken.paused()
    //   assert.equal(status, false)
    // })

})
})
