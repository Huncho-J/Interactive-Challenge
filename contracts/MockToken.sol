pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20{
    uint256 public startTime;
    uint256 public endTime;

    constructor(uint256 _startTokenRelease, uint256 _endTokenRelease)  ERC20("TOKEN", "TKN"){
      _mint(msg.sender,100000);

      startTime = _startTokenRelease;
      endTime = _endTokenRelease;
    }
  function setStartTime(){
    //enable token transfers
  }

function setEndTime() public {

}

}
