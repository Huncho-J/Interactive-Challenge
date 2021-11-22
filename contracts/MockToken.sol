//"SPDX-License-Identifier: <SPDX-License>
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20{
    uint256 public startTime;
    uint256 public endTime;

    constructor()  ERC20("TOKEN", "TKN"){
      _mint(msg.sender,100000);


    }
  function setStartTime() public {
    //enable token transfers
  }

function setEndTime() public {

}

}
