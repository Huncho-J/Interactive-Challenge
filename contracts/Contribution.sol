//SPDX-License-Identifier: <SPDX-License>
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MockToken.sol";
contract Contribution{
  MockToken public tokenContract;
  mapping(address => uint) public DonatorList;
  event Received(address donator, uint totalDonation);

//constructor is initialized with mockToken address
    constructor(MockToken _mockToken)  public{
      tokenContract = _mockToken;
}
//safe multiplication. Takes two integers as input
function multiply(uint a,uint b) internal pure returns (uint c){
      require(a == 0 || (c = a * b) / a == b);
  }

//recieves eth & sends out mockTokens at the rate of msg.value * 2
 receive() external payable {
   //Ensure contract has enough tokens for transfer
   require(tokenContract.balanceOf(address(this)) >  multiply(msg.value,2),"Not enough tokens in contract");
   //transfer tokens to donator
   require(tokenContract.transfer(msg.sender,  multiply(msg.value,2)));
   //emit event
   emit Received(msg.sender, msg.value);
   //update donator List
   DonatorList[msg.sender] += msg.value;
 }

}
