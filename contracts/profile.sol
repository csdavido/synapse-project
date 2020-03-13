pragma solidity ^0.5.16;

contract profile {


    uint public thoughtCount = 0;
    uint userCount = 0;
    uint public numHandles = 0;

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
    mapping (string => uint) public handleList;


    constructor () public {
      genesisThought();
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

    function firstThought(string memory _handle) public {
      string memory ft = "I am alive!";
      thoughts[thoughtCount] = Thought(thoughtCount, ft, msg.sender, _handle);
      senderThoughts[msg.sender]++;
      handles[msg.sender] = _handle;
      thoughtCount ++;
      handleList[_handle] = 1;
      numHandles ++;
    }


    function genesisThought() public {
      string memory ft = "Hello, World!";
      thoughts[thoughtCount] = Thought(thoughtCount, ft, msg.sender, "genesis");
      thoughtCount ++;
      handleList["synapse"] = 1;
      numHandles ++;
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

    function getHandle(address _addr) public view returns (string memory) {
        return handles[_addr];
    }

    function getOwnHandle() public view returns (string memory) {
        return handles[msg.sender];
    }

    event checkHandle(string _handle, address sndr, uint avail);


    function compareStrings (string memory a, string memory b) public view
       returns (bool) {
  return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );

       }

    function updateUser(string memory _handle) public returns (uint) {

      uint sndr = senderID[msg.sender];

      if (senderThoughts[msg.sender] == 0) {
        firstThought(_handle);
        emit checkHandle (_handle, msg.sender, 1);
        //return 1;
      }

      else if (compareStrings(_handle, "Anonymous") == true) {

        string memory handleStorageAnon = handles[msg.sender];


        users[sndr] = User(sndr, _handle, msg.sender);
        handles[msg.sender] = _handle;
        handleList[handleStorageAnon] = 0;
        handleList[_handle] = 0;
      }

      else {

        string memory handleStorage = handles[msg.sender];

        if (handleList[_handle] != 1) {

          if (handleList[_handle] != 0) {
            numHandles++;
          }

          users[sndr] = User(sndr, _handle, msg.sender);
          handles[msg.sender] = _handle;
          handleList[handleStorage] = 0;
          handleList[_handle] = 1;
          emit checkHandle (_handle, msg.sender, 2);
          //return 2;
        }
        else {
          emit checkHandle (_handle, msg.sender, 3);
          //return 3;
        }
      }
    }



  }
