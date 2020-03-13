pragma solidity ^0.5.16;

contract follow {

  mapping(address => address[]) public following;

  function addFollower(address newFollow) public {

    following[msg.sender].push(0xcE0628FCb54fBDd2B93c20Cab6936Ff6A2Ef2F46);

    following[msg.sender].push(newFollow);

  }

  function getFollowers() public view returns (address[] memory) {

    return following[msg.sender];

  }

}
