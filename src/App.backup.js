import React from 'react';
import ReactDOM from 'react-dom';
import logo from './public/home/logo.png';
import text from './public/home/text.png';
import './App.css';
import web3 from './web3';

//var Eth = require('web3-eth');


function isInstalled() {
   if (typeof web3 !== 'undefined'){
      console.log('MetaMask is installed')
   }
   else{
      console.log('MetaMask is not installed')
   }
}

function isLocked() {
   web3.eth.getAccounts(function(err, accounts){
      if (err != null) {
         console.log(err)
      }
      else if (accounts.length === 0) {
         console.log('MetaMask is locked')
      }
      else {
         console.log('MetaMask is unlocked')
      }
   });
}

isInstalled();
isLocked();



console.log ("begin console");



var accounts = web3.eth.accounts;

if (accounts) {
 web3.eth.defaultAccount = accounts[0];
 var account = web3.eth.accounts[0];
 console.log (account + " Account")
}

var accountInterval = setInterval(function() {
  if (web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0];
    console.log("Account Changed! Need to do something here...");
  }
}, 100);



web3.eth.getAccounts((error, accounts) => console.log(accounts[0]));
web3.eth.getAccounts((error, accounts) => console.log(web3.eth.getBalance(accounts[0])));

var ethBal = web3.eth.getAccounts((error, accounts) => console.log(web3.eth.getBalance(accounts[0])));


console.log ("end console: ");

/*
function tick() {
const element = (
  <div>
    <h1>Hello, world!</h1>
    <h2>It is {new Date().toLocaleTimeString()}.</h2>
    <h2> Eth Balance: {ethBal} </h2>
  </div>
);
ReactDOM.render(
  element,
  document.getElementById('root')
);
}

setInterval(tick, 1000);

*/


const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

/*
class Web3Provider extends Component {
constructor(props) {
  super(props);
  this.props.fetchAccounts();
  this.props.fetchNetwork();
  this.interval = null;
  this.networkInterval = null;
}
*/



class App extends React.Component {


  constructor(props) {
  super(props);
  this.state = {
    data: [],
    account: []
    };
  }



async componentDidMount() {

  const bata = "test"

  const account = await web3.eth.getAccounts((error, accounts) => web3.eth.getBalance(accounts[0]));
  const data = await window.web3.eth.getBalance(accounts[0]);
  this.setState({ data, account });
}


  //state = {
  //ethBalance: ''
  //};


/*  async componentDidMount() {

    const account0 = await web3.eth.accounts[0];
    var acct = await web3.eth.getAccounts((error, accounts) => console.log(accounts[0]));

    //const balance = await web3.eth.getBalance(account0);

    console.log("Got account! " + acct);

    this.setState({ acct });
  }
  */




render() {

  const { data } = this.state;
  const { account } = this.state;


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={text} className="Text-logo" alt="logo" />
        <p>
          a blockchain-based social network
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>

        <p></p>

        <p>
          Active Account: {account}
        </p>
        <p>
          Your Eth balance: {data}
        </p>

        <p></p>


      </header>
    </div>
  );
  }
}

export default App;
