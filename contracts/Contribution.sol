pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MockToken.sol";
contract Contribution{
  MockToken public tokenContract;
  mapping(address => uint) public DonatorList;

    constructor(MockToken _mockToken)  public{
      tokenContract = _tokenContract;
}


}
