pragma solidity ^0.5.16;

contract profile {


    uint public thoughtCount = 0;
    uint userCount = 0;

    struct Thought {
      uint id;
      string thought;
      address sender;
      string handle;
    }

    struct User {
      uint id;
      string handle;
      address user;
    }


    //Thought[] public thoughts;

    mapping(uint => Thought) public thoughts;
    mapping(uint => User) public users;
    mapping (address => string) handles;
    mapping (address => uint) senderThoughts;
    mapping (address => uint) senderID;


    constructor () public {
      firstThought();
    }

    function getUser () public {

    }

    function createThought(string memory _content) public {

      if (senderThoughts[msg.sender] == 0) {
        newUser("Anonymous");
      }

      string memory user = handles[msg.sender];

      thoughts[thoughtCount] = Thought(thoughtCount, _content, msg.sender, user);
      senderThoughts[msg.sender]++;
      thoughtCount++;

    }


    function firstThought() public {
      string memory ft = "Hello, World!";
      thoughts[thoughtCount] = Thought(thoughtCount, ft, msg.sender, "genesis");
      thoughtCount ++;
    }

    function readThoughts() public {

    }

    function newUser(string memory _handle) public {
      require(senderThoughts[msg.sender] == 0);
      users[userCount] = User(userCount, _handle, msg.sender);
      handles[msg.sender] = _handle;
      senderID[msg.sender] = userCount;
      userCount++;
    }

    function updateUser(string memory _handle) public {

      uint sndr = senderID[msg.sender];

      users[sndr] = User(sndr, _handle, msg.sender);
      handles[msg.sender] = _handle;
    }



  }
