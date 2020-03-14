pragma solidity ^0.5.16;

contract follow {

  mapping(address => address[]) public following;
  mapping(address => uint) public followCount;



  function addFollower(address newFollow) public {

    following[msg.sender].push(newFollow);

    followCount[msg.sender]++;

  }

  function getFollowers() public view returns (address[] memory) {

    return following[msg.sender];

  }

  function getFollowCount() public view returns (uint) {
    return followCount[msg.sender];
  }

}
