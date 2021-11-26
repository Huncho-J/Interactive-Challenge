//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MockToken.sol";
contract Contribution{
  MockToken public tokenContract;
  mapping(address => uint) public ContributionList;
  event Received(address contributor, uint totalContribution);

//constructor is initialized with mockToken address
    constructor(MockToken _mockToken){
      tokenContract = _mockToken;
}
//safe multiplication. Takes two integers as input
function multiply(uint a,uint b) internal pure returns (uint c){
      require(a == 0 || (c = a * b) / a == b);
  }

//recieves eth & sends out mockTokens at the rate of msg.value * 2
 function sendEth() public payable {
   //Ensure contract has enough tokens for transfer
   require(tokenContract.balanceOf(address(this)) >  multiply(msg.value,2),"Not enough tokens in contract");
   //transfer tokens to Contributor
   require(tokenContract.transfer(msg.sender,  multiply(msg.value,2)));
   //emit event
   emit Received(msg.sender, msg.value);
   //update Contributor List
   ContributionList[msg.sender] += msg.value;
 }
//Takes an address as input. returns total Contribution of user
 function checkTotalContribution(address _Contributor) public view returns(uint) {
   uint ethContribution = ContributionList[_Contributor];
   return ethContribution;
 }

}
