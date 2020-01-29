pragma solidity ^0.5.16;

contract profile {

  uint public thoughtCount = 77;

  struct Thought {
    uint id;
    string thought;
    uint user;
  }


/*
  mapping(uint => Thought) public thoughts;


  function createThought(string memory _content) public {
    thoughtCount ++;
    thoughts[thoughtCount] = Thought(thoughtCount, _content, msg.sender);
  }
  */


}
