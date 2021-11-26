//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MockToken is ERC20, Pausable, Ownable{
    uint256 public startTime;
    uint256 public endTime;
    event Paused(bool status, uint time);
    event Unpaused(bool status, uint time);

    constructor(uint _startTime, uint _endTime)  ERC20("TOKEN", "TKN") {
      //mint 1million worth to deployer
     _mint(msg.sender,1000000000000000000000000);
      startTime = _startTime;
      endTime = _endTime;
    }
  //pause contract after specified endTime
    function pause() public onlyOwner {
      //check for endTime set
      require(block.timestamp <= endTime, "Not the right end time");
      //emit event
      emit Paused(true, endTime);
      //call pause() from openzeppelin
      _pause();
      }
//unpause contract after specified startTime: use open zepplin pause modifier
    function unpause() public onlyOwner whenPaused {
      //check for startTime set
      require(block.timestamp >= startTime, "Not the right start time");
      //emit event
      emit Unpaused(false, startTime);
      //call pause() from openzeppelin
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
