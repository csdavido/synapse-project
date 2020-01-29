pragma solidity ^0.5.16;

contract profile {

  uint public thoughtCount = 77;

  struct Thought {
    uint id;
    string thought;
    uint user;
  }

  mapping(uint => Thought) public thoughts;


  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
  }


}
