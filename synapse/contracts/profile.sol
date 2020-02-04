pragma solidity ^0.5.16;

contract profile {

  uint public thoughtCount = 0;

  struct Thought {
    uint id;
    string thought;
    address user;
  }


  //Thought[] public thoughts;

  mapping(uint => Thought) public thoughts;


  constructor () public {
    firstThought();
  }

  function createThought(string memory _content) public {
    thoughts[thoughtCount] = Thought(thoughtCount, _content, msg.sender);
    thoughtCount++;
  }


  function firstThought() public {
    string memory ft = "Hello, World!";
    thoughts[thoughtCount] = Thought(thoughtCount, ft, msg.sender);
    thoughtCount ++;
  }

  function readThoughts() public {

  }



}
