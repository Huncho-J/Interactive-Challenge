//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MockToken is ERC20, Pausable, Ownable{
    uint256 public startTime;
    uint256 public endTime;

    constructor(uint _startTime, uint _endTime)  ERC20("TOKEN", "TKN") {
     _mint(msg.sender,1000000000000000000000000);
      startTime = _startTime;
      endTime = _endTime;
    }
//pause contract after specified endTime
  function pause() public onlyOwner {
    require(block.timestamp < endTime);
        _pause();
    }
//unpause contract after specified startTime
    function unpause() public onlyOwner {
      require(block.timestamp >= startTime);
        _unpause();
    }
//override _beforeTransferFunction to only be called when not paused
function _beforeTokenTransfer(address from, address to, uint amount) internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

}
