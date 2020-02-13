pragma solidity ^0.5.16;

contract user {

  uint public userCount = 0;

  struct User {
    uint id;
    string handle;
    address user;
  }

  mapping(uint => User) public users;
  mapping (address => string) handles;
  mapping (address => uint) ownerThoughts;


  function newUser(string memory _handle) public {
    require(ownerThoughts[msg.sender] == 0);
    users[userCount] = User(userCount, _handle, msg.sender);
    handles[msg.sender] = _handle;
    userCount++;
  }

  function updateUser(string memory _handle, uint _user) public {
    users[_user] = User(_user, _handle, msg.sender);
    handles[msg.sender] = _handle;
  }

}
