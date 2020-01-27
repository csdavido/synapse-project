import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import logo from './public/home/logo.png';
import text from './public/home/text.png';



function isInstalled() {
   if (typeof Web3 !== 'undefined'){
      console.log('MetaMask is installed')
   }
   else{
      console.log('MetaMask is not installed')
   }
}

function isLocked(web3) {
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


class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    //const web3 = new Web3(window.web3.currentProvider);

    isInstalled();
    isLocked(web3);

    const accounts = await web3.eth.getAccounts()
    const balanceWei = await web3.eth.getBalance(accounts[0])

    var balance = balanceWei/1000000000000000000

    this.setState({ account: accounts[0], balance: balance })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: ''

    }
  }

  render() {
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

          <p>Your account: {this.state.account}</p>
          <p>Your balance: {this.state.balance}</p>

          <p></p>


        </header>
      </div>


    );
  }
}

export default App;
