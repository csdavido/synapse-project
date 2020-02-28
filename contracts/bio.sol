pragma solidity ^0.5.16;

contract bio {
    mapping (address => string) public bios;
    
    function updateBio(string memory _bio) public {
      bios[msg.sender] = _bio;
  }
  
    function getBio(address _user) public view returns (string memory) {
      return bios[_user];
  }
}